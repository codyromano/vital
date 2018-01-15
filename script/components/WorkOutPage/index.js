import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import withAudioSource from 'vital-components/withAudioSource';
import withAudioPreferences from 'vital-components/withAudioPreferences';
import { sharedMusicPreferencesModel } from 'vital-models/MusicPreferencesModel';
import GeolocationModel from 'vital-models/GeolocationModel';
import { getDecodedAudioDataFromUrl, connectNewBufferSource } from 'vital-utils/audioUtils';
import MetricDisplay from 'vital-components/MetricDisplay';
import LoadProgressIndicator from 'vital-components/LoadProgressIndicator';
import Progress from 'vital-components/Progress';
import ActionButton from 'vital-components/ActionButton';

// TODO: Move to standalone component and remove inline styles
const LayoutRow = (props) => (
  <PageWidthContainer>
    <div style={{ marginBottom: '1rem' }}>
      {props.children}
    </div>
  </PageWidthContainer>
);

import MediaFileFactory from 'vital-models/MediaFileFactory';

// TODO: Change name to 'Visualization' or similar
import Visualiser from 'vital-components/App';
import './WorkOutPage.scss';

async function getAudioDataSource(audioContext, sourceUrl) {
  const audioData = await getDecodedAudioDataFromUrl(
  audioContext, sourceUrl);

  return connectNewBufferSource(audioContext, audioData);
}

// TODO: Let listeners unsubscribe
function onGeolocationChange(callback) {
  const onGeolocationSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    callback(latitude, longitude);
  };

  const onGeolocationError = (...errorArgs) => {
    console.error('Error determining geoposition. ', errorArgs);
  };

  window.navigator.geolocation.watchPosition(
    onGeolocationSuccess,
    onGeolocationError
  );
}

const geolocationModel = new GeolocationModel();

class WorkOutPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.audioContext = new (AudioContext || webkitAudioContext)();
    this.audioSource = null;

    const initialMilesPerHour = 0;

    this.state = {
      currentMilesPerHour: 0,
      playbackRate: sharedMusicPreferencesModel.mapMilesPerHourToSongSpeed(
        initialMilesPerHour
      ),
      maxPlaybackRate: false
    };
    this.updateMusicOnGeolocationChange = this.updateMusicOnGeolocationChange.bind(this);
  }

  updateMusicOnGeolocationChange() {
    onGeolocationChange((latitude, longitude) => {

      // TODO: Provide the audio source via an HOC so that WorkOutPage
      // doesn't have to wait for it.
      if (!this.audioSource) {
        console.warn('Waiting for audio source');
        return;
      }

      geolocationModel.addLocation({ latitude, longitude });

      const currentMilesPerHour = geolocationModel.getCurrentMilesPerHour();
      const playbackRate = sharedMusicPreferencesModel
        .mapMilesPerHourToSongSpeed(currentMilesPerHour);

      this.audioSource.playbackRate.value = parseFloat(playbackRate.toPrecision(3));

      if (this.mounted) {
        this.setState({
          currentMilesPerHour,
          playbackRate,
          maxPlaybackRate: sharedMusicPreferencesModel.maximumSpeed === playbackRate
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;

    if (this.audioSource) {
      this.audioSource.stop();
    }
  }

  loadAudio() {
    getAudioDataSource(this.audioContext, this.props.songUrl).then(
      (audioSource) => {
        if (audioSource.buffer) {
          this.audioSource = audioSource;
          this.forceUpdate();
        } else {
          this.props.history.push('/error/music-load');
        }
      }
    );
  }
  componentDidMount() {
    this.mounted = true;

    this.loadAudio();
    this.updateMusicOnGeolocationChange();
  }
  componentWillReceiveProps() {
    this.loadAudio();
  }
  render() {
    if (!this.audioSource) {
      return (
        <BasePage>
          <PageWidthContainer>
            <LoadProgressIndicator/>
          </PageWidthContainer>
        </BasePage>
      );
    }

    const overdrive = this.state.maxPlaybackRate;
    const speedMetric = overdrive ? 'MAX' : this.state.playbackRate * 100;
    const speedUnit = overdrive ? '' : '%';

    // TODO: Move to .scss file
    const paragraphStyles = {
      display: 'block',
      width: '100%',
      textAlign: 'center'
    };

    return (
      <BasePage headerBottomPadding={false}>
        <Visualiser
          audioContext={this.audioContext}
          audioSource={this.audioSource}
        />
        <PageWidthContainer>
          <p style={paragraphStyles}>Move faster to boost your music.</p>
        </PageWidthContainer>

        <LayoutRow>
          <Progress
            label={`Boost level: ${Math.round(this.state.playbackRate * 100)}%`}
            min={sharedMusicPreferencesModel.minimumSpeed}
            max={sharedMusicPreferencesModel.maximumSpeed}
            value={this.state.playbackRate}
            backgroundColor="#fff"
            barColor="#1abc9c"
          />
        </LayoutRow>

        <LayoutRow>
          <div className="metric-group">
            <MetricDisplay
              metric={this.state.currentMilesPerHour}
              precision={1}
              unit={'current MPH'}
              size={'large'}
            />
            <MetricDisplay
              metric={sharedMusicPreferencesModel.targetMilesPerHour}
              precision={1}
              unit={'target MPH'}
              size={'large'}
            />
          </div>
        </LayoutRow>

        <LayoutRow>
          <div style={paragraphStyles}>
            <ActionButton to="/configure-music">Update music settings</ActionButton>
          </div>
        </LayoutRow>
      </BasePage>
    );
  }
}

WorkOutPage.propTypes = {
  songUrl: PropTypes.string.isRequired
  // TODO: Define other props
};

export default withAudioPreferences(
  WorkOutPage
);
