import React from 'react';
import PropTypes from 'prop-types';
import { convertSensorSpeedToMilesPerHour } from 'vital-utils/mathUtils';

const geolocationPositionShape = PropTypes.shape({
  coords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    speed: PropTypes.number,
    accuracy: PropTypes.number
  })
});

/**
* Provides realtime location data to a child component
*/
class GeolocationProvider extends React.Component {
  static propTypes = {
    // High accuracy is great, but consider the battery-use tradeoff
    watchPositionOptions: PropTypes.shape({
      enableHighAccuracy: PropTypes.bool
    }),
    // You probably don't need to override this except for mocking
    geolocationProvider: PropTypes.shape({
      watchPosition: PropTypes.func,
      clearWatch: PropTypes.func
    })
  };

  static defaultProps = {
    watchPositionOptions: {
      enableHighAccuracy: true
    },
    geolocationProvider: window.navigator.geolocation
  };

  constructor() {
    super();

    this.state = {
      geolocation: {
        latitude: null,
        longitude: null,
        speed: null,
        accuracy: null,
        positionError: null,
        currentMPH: 0
      }
    };

    this.onGeolocationSuccess = this.onGeolocationSuccess.bind(this);
    this.onGeolocationError = this.onGeolocationError.bind(this);
  }

  componentDidMount() {
    this.watchLocation = this.props.geolocationProvider.watchPosition(
      this.onGeolocationSuccess,
      this.onGeolocationError,
      this.props.watchPositionOptions
    );
  }

  componentWillUnmount() {
    this.props.geolocationProvider.clearWatch(this.watchLocation);
  }

  onGeolocationError(positionError) {
    this.setState({ positionError });
  }

  onGeolocationSuccess(position) {
    // It's necessary to explicitly each property in coords. It
    // can't be passed directly because it's not a normal object.
    this.setState({
      geolocation: {
        accuracy: position.coords.accuracy,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        speed: position.coords.speed,
        // Convert meters per second to mph
        currentMPH: convertSensorSpeedToMilesPerHour(
          position.coords.speed
        )
      }
    });
  }

  render() {
    const Component = this.props.component;
    return (
      <Component
        {...this.state}
        {...this.props}
      />
    );
  }
}

/**
* Vend an HOC version for flexibility
*/
const withGeolocation = (options) => (Component) => (props) => {
  return (
    <GeolocationProvider
      component={Component}
      {...props}
      {...options}
    />
  );
};

export {
  GeolocationProvider,
  geolocationPositionShape,
  withGeolocation
};

