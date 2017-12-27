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
    async componentDidMount() {
      const audioData = await getDecodedAudioDataFromUrl(audioContext, sourceUrl);
      const source = connectNewBufferSource(audioContext, audioData);

      this.setState({ source });
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
