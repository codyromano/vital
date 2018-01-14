import BaseMediaFile from 'vital-models/BaseMediaFile';

const mapMediaFileIdToBucketFileName = {
  'bass-drop': 'bass-drop.wav'
};

export default class GoogleCloudMediaFile extends BaseMediaFile {
  constructor(id) {
    super(id);
    this.id = 'bass-drop';
  }
  async _getMetadata() {
    const fileName = mapMediaFileIdToBucketFileName[this.id];
    const bucketObjectURI = 'https://www.googleapis.com/storage/' +
      'v1/b/databassio/o/' + window.encodeURIComponent(fileName);

    const rawMetadata = await window.fetch(bucketObjectURI);
    return rawMetadata.json();
  }
  async getStreamingUrl() {
    const metadata = await this._getMetadata();
    return metadata.mediaLink;
  }
}
