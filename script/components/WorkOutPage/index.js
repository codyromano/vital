import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import { withGeolocation } from 'vital-components/GeolocationProvider/index';
import MockGeolocationService from 'vital-components/GeolocationProvider/MockGeolocationService';
import { getDecodedAudioDataFromUrl, connectNewBufferSource } from 'vital-utils/audioUtils';
import MetricDisplay from 'vital-components/MetricDisplay';
import LoadProgressIndicator from 'vital-components/LoadProgressIndicator';
import Progress from 'vital-components/Progress';
import ActionButton from 'vital-components/ActionButton';
import { withModel, modelApiShape } from 'vital-components/ModelProvider';
import { clamp, PlaybackRateCalculator, getPercentProgress } from 'vital-utils/mathUtils';

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

class WorkOutPage extends React.Component {
  static propTypes = {
    geolocation: PropTypes.shape({
      currentMPH: PropTypes.number
    }).isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.audioContext = new (AudioContext || webkitAudioContext)();
    this.audioSource = null;
    this.playbackRateCalculator = new PlaybackRateCalculator();

    // TODO: WorkOutPage shouldn't own this
    // Reset mock location service
    MockGeolocationService._coords.speed = 0;
  }

  componentWillReceiveProps(newProps) {
    if (this.audioSource) {
      const newRate = this.playbackRateCalculator.getRate({
        ...newProps.model,
        currentMPH: this.props.geolocation.currentMPH
      });
      this.audioSource.playbackRate.value = newRate;
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.audioSource) {
      this.audioSource.stop();
    }
  }

  async loadAudio() {
    // const song = mediaFileFactory.getMediaFile(this.props.match.params.songId);
    const songInfo = this.props.model.songs.filter(song =>
      song.id === this.props.match.params.songId
    )[0];

    if (!songInfo) {
      console.error(`Song ID in URL doesn't match any
        songs loaded from the media API.`);
      this.props.history.push('/error/music-load');
      return;
    }

    getAudioDataSource(this.audioContext, songInfo.mediaLink).then(
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

    const currentMPH = this.props.geolocation.currentMPH;
    const { targetMPH } = this.props.model;
    const percentProgress = getPercentProgress(currentMPH, targetMPH);

    const primaryHelpText = this.props.geolocation.speed === null ?
      `Your device doesn't have a speed sensor or it's disabled.` :
      `Move faster to boost your music.`;

    return (
      <div>
        <Visualiser
          audioContext={this.audioContext}
          audioSource={this.audioSource}
        />
        <PageWidthContainer>
          <p style={paragraphStyles}>{primaryHelpText}</p>
        </PageWidthContainer>

        <LayoutRow>
          <Progress
            label={`Boost level: ${percentProgress}%`}
            min={0}
            max={targetMPH}
            value={currentMPH}
            backgroundColor="#fff"
            barColor="#1abc9c"
          />
        </LayoutRow>

        <LayoutRow>
          <div className="metric-group">
            <MetricDisplay
              metric={currentMPH}
              precision={1}
              unit={'current MPH'}
              size={'large'}
            />
            <MetricDisplay
              metric={targetMPH}
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
  geolocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    speed: PropTypes.number
  }),
  model: PropTypes.shape({
    targetMPH: PropTypes.number.isRequired,
    minSpeed: PropTypes.number.isRequired,
    maxSpeed: PropTypes.number.isRequired,
    playbackRate: PropTypes.number.isRequired
  }),
  updateModel: PropTypes.func.isRequired
  // TODO: Define other props
};

let geolocationProviderOptions = {};

if (window.location.href.includes('mock')) {
  geolocationProviderOptions = {
    geolocationProvider: MockGeolocationService
  };
}

export default withGeolocation(geolocationProviderOptions)(
  withModel(WorkOutPage)
);
