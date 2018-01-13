import React from 'react';
import PropTypes from 'prop-types';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import withAudioSource from 'vital-components/withAudioSource';
import { sharedMusicPreferencesModel } from 'vital-models/MusicPreferencesModel';
import GeolocationModel from 'vital-models/GeolocationModel';
import { getDecodedAudioDataFromUrl, connectNewBufferSource } from 'vital-utils/audioUtils';
import MetricDisplay from 'vital-components/MetricDisplay';

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

export default class WorkOutPage extends React.Component {
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
      // TODO: Clean this up
      if (!this.audioSource) {
        return;
      }

      geolocationModel.addLocation({ latitude, longitude });

      const currentMilesPerHour = geolocationModel.getCurrentMilesPerHour();
      const playbackRate = sharedMusicPreferencesModel
        .mapMilesPerHourToSongSpeed(currentMilesPerHour);

      this.audioSource.playbackRate.value = playbackRate;

      this.setState({
        currentMilesPerHour,
        playbackRate,
        maxPlaybackRate: sharedMusicPreferencesModel.maximumSpeed === playbackRate
      });

      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.audioSource.stop();
  }

  loadAudio() {
    const sourceUrl = sharedMusicPreferencesModel.getSongSource();

    getAudioDataSource(this.audioContext, sourceUrl).then(
      (audioSource) => {
        this.audioSource = audioSource;
        this.forceUpdate();
      }
    );
  }
  componentDidMount() {
    this.loadAudio();
    this.updateMusicOnGeolocationChange();
  }
  componentWillReceiveProps() {
    this.loadAudio();
  }
  render() {
    // TODO: Make loading component
    if (!this.audioSource) {
      return (<div>Loading audio</div>);
    }

    const overdrive = this.state.maxPlaybackRate;
    const speedMetric = overdrive ? 'MAX' : this.state.playbackRate * 100;
    const speedUnit = overdrive ? '' : '%';

    return (
      <BasePage>
        <div className="metric-dashboard">
          <MetricDisplay
            metric={this.state.currentMilesPerHour}
            unit={'mph'}
          />
          <MetricDisplay
            precision={0}
            metric={speedMetric}
            unit={speedUnit}
            overdrive={overdrive}
          />
        </div>
        <Visualiser
          audioContext={this.audioContext}
          audioSource={this.audioSource}
        />
      </BasePage>
    );
  }
}
