import React from 'react';
import PropTypes from 'prop-types';
import { getDecodedAudioDataFromUrl, connectNewBufferSource } from 'vital-utils/audioUtils'

const withAudioSource = ({ audioContext, sourceUrl }) => (Component) => {
  class WithAudio extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        source: null
      };
    }
    async getAudioDataSource(newAudioContext, newSourceUrl) {
      console.log(newAudioContext, newSourceUrl);
      
      if (newAudioContext && newSourceUrl) {
        const audioData = await getDecodedAudioDataFromUrl(
          newAudioContext, newSourceUrl);
        const source = connectNewBufferSource(
          newAudioContext, audioData);
        this.setState({ source });
      }
    }
    componentWillReceiveProps(newProps) {
      this.getAudioDataSource(newProps.audioContext, newProps.sourceUrl);
    }
    componentDidMount() {
      this.getAudioDataSource(this.props.audioContext, this.props.sourceUrl);
    }
    render() {
      return this.state.source && (
        <Component
          {...this.props}
          audioSource={this.state.source}
          audioContext={audioContext}
        />
      );
    }
  }

  return WithAudio;
};

export default withAudioSource;
