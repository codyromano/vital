import React from 'react';
import PropTypes from 'prop-types';
import './soundAnalyserCanvas.scss';

// Used to determine frequency domain
const fastFourierTransformSetting = 2048;

export default class SoundAnalyserCanvas extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.draw = this.draw.bind(this);
	}

	configureAudioContextAnalyser(audioContext) {
		this.analyser = audioContext.createAnalyser();
		this.analyser.fftSize = fastFourierTransformSetting;
		this.props.audioSource.connect(this.analyser);
	}

	updateAudioContextAnalyser() {
		this.bufferLength = this.analyser.frequencyBinCount;
		this.dataArray = new Uint8Array(this.bufferLength);
		// this.analyser.getByteTimeDomainData(this.dataArray);
		this.analyser.getByteFrequencyData(this.dataArray);
	}

	configureCanvas() {
		this.canvasContext = this.canvasElement.getContext("2d");
	}

	draw() {
	  window.requestAnimationFrame(this.draw);

	  this.updateAudioContextAnalyser();

	  this.canvasContext.fillStyle = '#000';
	  this.canvasContext.fillRect(0, 0,
	  	this.canvasElement.width,
	  	this.canvasElement.height
	  );

	  this.canvasContext.lineWidth = 1;
	  this.canvasContext.strokeStyle = 'cornflowerblue';

	  this.canvasContext.beginPath();

	  var sliceWidth = this.canvasElement.width * 1.0 / this.bufferLength;

	  var x = 0;

	  for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
	    // var v = this.dataArray[i] / 128.0;
	    var v = (this.dataArray[i] / 128.0) * Math.random();
	    var y = v * this.canvasElement.height / 2;

	    if (i === 0) {
	      this.canvasContext.moveTo(x, y);
	    } else {
	      this.canvasContext.lineTo(x, y);
	    }

	    x += sliceWidth;
	  }

	  this.canvasContext.lineTo(
	  	this.canvasElement.width,
	  	this.canvasElement.height / 2
	  );
	  this.canvasContext.stroke();
	}

	componentDidMount() {
		this.configureAudioContextAnalyser(this.props.audioContext);
		this.configureCanvas();

		window.requestAnimationFrame(this.draw);
	}

	render() {
		return (
			<canvas
				className="sound-analyser-canvas"
				ref={(canvasElement) => { this.canvasElement = canvasElement; }}
			/>
		);
	}
}

SoundAnalyserCanvas.propTypes = {
	audioSource: PropTypes.shape({
		connect: PropTypes.func.isRequired
	}).isRequired,
	audioContext: PropTypes.shape({
		createAnalyser: PropTypes.func.isRequired
	}).isRequired
};
