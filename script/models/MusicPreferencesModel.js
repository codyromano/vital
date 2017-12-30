import BaseModel from 'vital-models/BaseModel';

export default class MusicPreferencesModel extends BaseModel {
  constructor() {
    super();
    this.defaultMinimumSpeed = 0.5;
    this.defaultMaximumSpeed = 3;

    this.songSource = null;
    this.minimumSpeed = this.defaultMinimumSpeed;
    this.maximumSpeed = this.defaultMaximumSpeed;
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
