import React from 'react';
import PropTypes from 'prop-types';
import Range from 'vital-components/Range';
import SoundAnalyserCanvas from 'vital-components/SoundAnalyserCanvas';
import './App.scss';

export default class App extends React.Component {
  componentDidMount() {
    this.props.audioSource.start();
    this.props.audioSource.frequency = 1000;
  }
  componentWillUnmount() {
    this.props.audioSource.stop();
    delete this.changeSpeed;
  }
  render() {
    return (
      <div className="sound-canvas-wrapper">
        <SoundAnalyserCanvas
          width={window.screen.width}
          height={200}
          lineWidth={5}
          audioContext={this.props.audioContext}
          audioSource={this.props.audioSource}
        />
      </div>
    );
  }
}
