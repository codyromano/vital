import { convertSensorSpeedToMilesPerHour } from 'vital-utils/mathUtils';

// TODO: This would be more stable / extensible if it weren't a singleton.
const MockGeolocationService = {
  _coords: {
    latitude: 42,
    longitude: 42,
    accuracy: 100,
    speed: 0,
    maxSpeed: 4
  },

  _stepLatitude: 0.2,
  _stepLongitude: 0.3,

  // Meters per second
  _stepSpeed: 0.05,

  _generateCoords() {
    // When max limit is reached, start decreasing volume
    if (this._coords.speed >= this._coords.maxSpeed && this._stepSpeed >= 0) {
      this._stepSpeed = -this._stepSpeed;
    }
    // When min limit is reached, start increasing again
    if (this._coords.speed <= 0 && this._stepSpeed <= 0) {
      this._stepSpeed = -this._stepSpeed;
    }

    this._coords.latitude+= this._stepLatitude;
    this._coords.longitude+= this._stepLongitude;
    this._coords.speed+= convertSensorSpeedToMilesPerHour(
      this._stepSpeed
    );
    if (this._coords.speed < 0) {
      this._coords.speed = 0;
    }

    return Object.assign({}, {coords: this._coords});
  },

  watchPosition(callback) {
    return window.setInterval(() => {
      callback(this._generateCoords());
    }, 500);
  },

  clearWatch(id) {
    window.clearInterval(id);
  }
};

export default MockGeolocationService;
