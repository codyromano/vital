import BaseModel from 'vital-models/BaseModel';
import haversine from 'haversine';

const millisecondsInOneHour = 1000 * 60 * 60;

export default class GeolocationModel extends BaseModel {
  constructor() {
    super();
    this.coordinates = [];

    // Current MPH should be based only on the user's *recent* workout speed.
    this.coordsMaxAgeSeconds = 10;
  }

  addLocation({ latitude, longitude }) {
    this.coordinates.push({
      latitude,
      longitude,
      time: new Date().getTime()
    });
  }

  isStaleCoordinate(coord) {
    const currentTime = new Date().getTime();
    return currentTime - coord.time >= this.coordsMaxAgeSeconds * 1000;
  }

  _getMilesPerHourEstimateFromCoordPair(coordsA, coordsB) {
    const mostRecentMilesDelta = haversine(coordsA, coordsB, {units: 'miles'});
    const mostRecentTimeDelta = coordsB.time - coordsA.time;

    // Make the time relative to one hour
    const timeMultiplier = millisecondsInOneHour / mostRecentTimeDelta;
    const currentMilesPerHourEstimate = mostRecentMilesDelta * timeMultiplier;

    return currentMilesPerHourEstimate;
  }

  getCurrentMilesPerHour() {
    const coords = this.coordinates.filter(
      coords => !this.isStaleCoordinate(coords)
    );
    // There's not enough location history to determine current mph
    if (coords.length < this.minimumSampleSize) {
      return 0;
    }

    const estimate = this._getMilesPerHourEstimateFromCoordPair(
      coords[0],
      coords[coords.length - 1]
    );

    return estimate;
  }
}
