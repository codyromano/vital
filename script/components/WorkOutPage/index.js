import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import GeolocationModel from 'vital-models/GeolocationModel';
import { getDecodedAudioDataFromUrl, connectNewBufferSource } from 'vital-utils/audioUtils';
import MetricDisplay from 'vital-components/MetricDisplay';
import LoadProgressIndicator from 'vital-components/LoadProgressIndicator';
import Progress from 'vital-components/Progress';
import ActionButton from 'vital-components/ActionButton';
import { withModel, modelApiShape } from 'vital-components/ModelProvider';
import MediaFileFactory from 'vital-models/MediaFileFactory';
import { clamp, calculateBoostRate, getPlaybackRate } from 'vital-utils/mathUtils';

const mediaFileFactory = new MediaFileFactory();

// TODO: Move to standalone component and remove inline styles
const LayoutRow = (props) => (
  <PageWidthContainer>
    <div style={{ marginBottom: '1rem' }}>
      {props.children}
    </div>
  </PageWidthContainer>
);

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
    this.updateMusicOnGeolocationChange = this.updateMusicOnGeolocationChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.audioSource.playbackRate.value = getPlaybackRate(
      newProps.model
    );
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
      this.props.updateModel(
        'currentMPH',
        geolocationModel.getCurrentMilesPerHour()
      );
    });
  }

  componentWillUnmount() {
    this.mounted = false;

    if (this.audioSource) {
      this.audioSource.stop();
    }
    this.props.updateModel('currentMPH', 0);
  }

  async loadAudio() {
    const song = mediaFileFactory.getMediaFile(this.props.model.songId);
    const songUrl = await song.getStreamingUrl();

    getAudioDataSource(this.audioContext, songUrl).then(
      (audioSource) => {
        if (audioSource.buffer) {
          if (this.mounted) {
            this.audioSource = audioSource;
            this.audioSource.start();
            this.audioSource.playbackRate.value = this.props.model.playbackRate;
            this.forceUpdate();
          }
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
    const speedMetric = this.props.model.playbackRate * 100;
    const speedUnit = '%';

    // TODO: Move to .scss file
    const paragraphStyles = {
      display: 'block',
      width: '100%',
      textAlign: 'center'
    };

    const percentProgress = calculateBoostRate(
      this.props.model.currentMPH,
      this.props.model.targetMPH
    );

    return (
      <div>
        <Visualiser
          audioContext={this.audioContext}
          audioSource={this.audioSource}
        />
        <PageWidthContainer>
          <p style={paragraphStyles}>Move faster to boost your music.</p>
        </PageWidthContainer>

        <LayoutRow>
          <Progress
            label={`Boost level: ${percentProgress}%`}
            min={0}
            max={100}
            value={percentProgress}
            backgroundColor="#fff"
            barColor="#1abc9c"
          />
        </LayoutRow>

        <LayoutRow>
          <div className="metric-group">
            <MetricDisplay
              metric={this.props.model.currentMPH}
              precision={1}
              unit={'current MPH'}
              size={'large'}
            />
            <MetricDisplay
              metric={this.props.model.targetMPH}
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
      </div>
    );
  }
}

WorkOutPage.propTypes = {
  model: PropTypes.shape({
    currentMPH: PropTypes.number.isRequired,
    targetMPH: PropTypes.number.isRequired,
    minSpeed: PropTypes.number.isRequired,
    maxSpeed: PropTypes.number.isRequired,
    playbackRate: PropTypes.number.isRequired
  }),
  updateModel: PropTypes.func.isRequired
  // TODO: Define other props
};

export default withModel(WorkOutPage);
