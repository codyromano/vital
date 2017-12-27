import React from 'react';
import PropTypes from 'prop-types';
import Range from 'vital-components/Range';
import withAudioSource from 'vital-components/withAudioSource';
import SoundAnalyserCanvas from 'vital-components/SoundAnalyserCanvas';
import './App.scss';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.changeSpeed = this.changeAudioSourceProperty.bind(this, 'speed');
  }
  componentDidMount() {
    this.props.audioSource.start();
    this.props.audioSource.frequency = 1000;
  }
  changeAudioSourceProperty(property, value) {
    switch (property) {
      case 'speed':
        this.props.audioSource.playbackRate.value = value;
      break;
    }
  }
  render() {
    return (
      <div>
        <SoundAnalyserCanvas
          audioContext={this.props.audioContext}
          audioSource={this.props.audioSource}
        />
        <fieldset>
          <label>Speed</label>
          <Range
            onValueChanged={this.changeSpeed}
            inputSettings={{
              defaultValue: 1.5,
              max: 3.0,
              min: 0.0,
              step: 0.01
            }}
          />
        </fieldset>
      </div>
    );
  }
}

export default withAudioSource({
  audioContext: new (AudioContext || webkitAudioContext)(),
  sourceUrl: './sounds/louis-ck.wav'
})(App);
