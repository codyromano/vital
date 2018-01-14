import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from 'vital-components/ActionButton';
import './AudioPreviewButton.scss';

class AudioPreviewButton extends React.Component {
  constructor() {
    super();
    this.state = {
      isPlaying: false
    };
    this.togglePlayback = this.togglePlayback.bind(this);
  }
  togglePlayback(event) {
    event.preventDefault();

    if (this.state.isPlaying) {
      this.audioClip.pause();
    } else {
      this.audioClip.play();
    }
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }
  render() {
    const playbackVerb = this.state.isPlaying ?
      'Stop' : 'Preview';

    return (
      <div className="audio-preview-button">
        <audio
          ref={(clip) => {this.audioClip = clip; }}
          controls={false}
          src={this.props.songUrl}
        />
        <ActionButton
          onClick={this.togglePlayback}
          isPrimary={false}
        >{playbackVerb}</ActionButton>
      </div>
    );
  }
}

AudioPreviewButton.propTypes = {
  songUrl: PropTypes.string.isRequired
};

export default AudioPreviewButton;
