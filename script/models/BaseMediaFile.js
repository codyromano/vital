import MediaFileError from 'vital-models/MediaFileError';

export default class BaseMediaFile {
  constructor(id) {
    if (!id) {
      throw new MediaFileError('Unspecified file id');
    }
  }
  async getStreamingUrl() {}
}