import BaseMediaFile from 'vital-models/BaseMediaFile';

// TODO: Create a microservice to provide song metadata
const mapMediaFileIdToBucketFileName = {
  'bassnectar': 'bassnectar.mp3',
  'martin-garrix-animals': 'martin-garrix-animals.mp3',
  'audien': 'audien.mp3'
};

export default class GoogleCloudMediaFile extends BaseMediaFile {
  constructor(id) {
    super(id);
    this.id = id;
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
