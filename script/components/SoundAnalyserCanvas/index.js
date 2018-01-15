import React from 'react';
import PropTypes from 'prop-types';
import './soundAnalyserCanvas.scss';
import generateWaveFormColor from './generateRandomShiftingWaveFormColor';

// Used to determine frequency domain
const fastFourierTransformSetting = 2048;

export default class SoundAnalyserCanvas extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.draw = this.draw.bind(this);
	}

  componentWillUnmount() {
    this._mounted = false;

    // Release DOM resources to prevent memory leaks
    delete this.analyser;
    delete this.bufferLength;
    delete this.dataArray;
    delete this.canvasContext;
    delete this.canvasElement;
  }

	configureAudioContextAnalyser(audioContext) {
		this.analyser = audioContext.createAnalyser();
		this.analyser.fftSize = fastFourierTransformSetting;
		this.props.audioSource.connect(this.analyser);
	}

	updateAudioContextAnalyser() {
		this.bufferLength = this.analyser.frequencyBinCount;
		this.dataArray = new Uint8Array(this.bufferLength);
		this.analyser.getByteTimeDomainData(this.dataArray);
	}

	configureCanvas() {
		this.canvasContext = this.canvasElement.getContext("2d");
	}

	draw() {
    if (!this._mounted) {
      return false;
    }

	  window.requestAnimationFrame(this.draw);

	  this.updateAudioContextAnalyser();

	  this.canvasContext.fillStyle = this.props.generateBackgroundColor(
      this.analyser,
      this.dataArray
    );

	  this.canvasContext.fillRect(0, 0,
	  	this.canvasElement.width,
	  	this.canvasElement.height
	  );

	  this.canvasContext.lineWidth = this.props.lineWidth;
    this.canvasContext.strokeStyle = this.props.generateWaveFormColor(
      this.analyser,
      this.dataArray
    );

	  this.canvasContext.beginPath();

	  const sliceWidth = this.canvasElement.width * 1.0 / this.bufferLength;

	  let x = 0;

	  for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
	    const v = this.dataArray[i] / 128.0;
	    const y = v * this.canvasElement.height / 2;

	    if (i === 0) {
	      this.canvasContext.moveTo(x, y);
	    } else {
	      this.canvasContext.lineTo(x, y);
	    }

	    x+= sliceWidth;
	  }

	  this.canvasContext.lineTo(
	  	this.canvasElement.width,
	  	this.canvasElement.height
	  );
	  this.canvasContext.stroke();
	}

	componentDidMount() {
    this._mounted = true;

		this.configureAudioContextAnalyser(this.props.audioContext);
		this.configureCanvas();

		window.requestAnimationFrame(this.draw);
	}

	render() {
		return (
			<canvas
        width={this.props.width}
        height={this.props.height}
				className="sound-analyser-canvas"
				ref={(canvasElement) => { this.canvasElement = canvasElement; }}
			/>
		);
	}
}

SoundAnalyserCanvas.defaultProps = {
  width: 500,
  height: 250,
  generateWaveFormColor: () => 'rgb(57, 201, 214)',
  generateBackgroundColor: () => 'rgb(48, 48, 48)',
  lineWidth: 50
};

SoundAnalyserCanvas.propTypes = {
  /**
  * Invoked with each animation frame. Determines color of
  * waveform.
  */
  generateBackgroundColor: PropTypes.func, 
  generateWaveFormColor: PropTypes.func,
	audioSource: PropTypes.shape({
		connect: PropTypes.func.isRequired
	}).isRequired,
	audioContext: PropTypes.shape({
		createAnalyser: PropTypes.func.isRequired
	}).isRequired,
  lineWidth: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
};
