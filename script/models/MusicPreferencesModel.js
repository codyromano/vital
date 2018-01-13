import BaseModel from 'vital-models/BaseModel';

export default class MusicPreferencesModel extends BaseModel {
  constructor() {
    super();

    this.defaultSongSource = './sounds/tycho-a-walk.wav';
    this.defaultMinimumSpeed = 0.25;
    this.defaultMaximumSpeed = 1.20;

    this.songSource = this.defaultSongSource;
    this.minimumSpeed = this.defaultMinimumSpeed;
    this.maximumSpeed = this.defaultMaximumSpeed;

    this.targetMilesPerHour = 12;
  }
  currentProgress(milesPerHour) {
    const percentOfMaximumSpeedAchieved = Math.min(
      1, milesPerHour / this.targetMilesPerHour
    );
    return percentOfMaximumSpeedAchieved;
  }
  mapMilesPerHourToSongSpeed(milesPerHour) {
    return Math.max(
      this.minimumSpeed,
      this.maximumSpeed * this.currentProgress(milesPerHour)
    );
  }
  updateSongSource(newSource) {
    this.songSource = newSource;
  }
  updateSongMinimumSpeed(newSpeed) {
    this.minimumSpeed = newSpeed;
  }
  updateSongMaximumSpeed(newSpeed) {
    this.maximumSpeed = newSpeed;
  }
  getSongSource() {
    return this.songSource;
  }
  getMinimumSpeed() {
    return this.defaultMinimumSpeed;
  }
  getMaximumSpeed() {
    return this.defaultMaximumSpeed;
  }
}

// TODO: Use a HOC component to provide the model instead of
// importing it statically
export const sharedMusicPreferencesModel = new MusicPreferencesModel();
