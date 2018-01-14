import React from 'react';
import PropTypes from 'prop-types';
import Range from 'vital-components/Range';
import SoundAnalyserCanvas from 'vital-components/SoundAnalyserCanvas';
import './App.scss';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.changeSpeed = this.changeAudioSourceProperty.bind(this, 'speed');
  }
  componentDidMount() {
    this.props.audioSource.start();
    this.props.audioSource.frequency = 1000;
  }
  componentWillUnmount() {
    this.props.audioSource.stop();
    delete this.changeSpeed;
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
          lineWidth={10}
          audioContext={this.props.audioContext}
          audioSource={this.props.audioSource}
        />
      </div>
    );
  }
}
