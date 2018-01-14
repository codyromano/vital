import React from 'react';
import { withRouter } from 'react-router-dom';
import MediaFileFactory from 'vital-models/MediaFileFactory';

const mediaFileFactory = new MediaFileFactory();

export default (Component) => withRouter(
  function withAudioPreferences(props) {
    const songIdFromURL = props.match.params.songId;
    const song = mediaFileFactory.getMediaFile(songIdFromURL);

    class WithSongLoading extends React.Component {
      constructor() {
        super();
        this.state = {
          songUrl: null
        };
      }
      componentDidMount() {
        const song = mediaFileFactory.getMediaFile(songIdFromURL);
        song.getStreamingUrl().then(songUrl => {
          this.setState({ songUrl });
        });
      }
      render() {
        if (!this.state.songUrl) {
          return null;
        }
        return (<Component
          songUrl={this.state.songUrl}
          {...props}
        />);
      }
    }

    return (<WithSongLoading />);
  }
);
