import BaseModel from 'vital-models/BaseModel';
import haversine from 'haversine';

const millisecondsInOneHour = 1000 * 60 * 60;

export default class GeolocationModel extends BaseModel {
  constructor() {
    super();
    this.coordinates = [];
  }
  
  addLocation({ latitude, longitude }) {
    this.coordinates.push({
      latitude,
      longitude,
      time: new Date().getTime()
    });
  }

  // TODO: Diffing the latest 2 coords works, but creates a lot of
  // variation. Maybe diff based on an average of the last n coords
  // to create a smoother listening experience?
  getCurrentMilesPerHour() {
    const totalCoords = this.coordinates.length;

    // There's not enough location history to determine current mph
    if (totalCoords < 2) {
      return 0;
    }

    const mostRecentMilesDelta = haversine(
      this.coordinates[totalCoords - 1],
      this.coordinates[totalCoords - 2],
      {units: 'miles'}
    );

    const mostRecentTimeDelta = this.coordinates[totalCoords - 1].time -
      this.coordinates[totalCoords - 2].time;

    // Make the time relative to one hour
    const timeMultiplier = millisecondsInOneHour / mostRecentTimeDelta;
    return mostRecentMilesDelta * timeMultiplier;
  }
}
