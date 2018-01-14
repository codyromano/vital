import GoogleCloudMediaFile from 'vital-models/GoogleCloudMediaFile';

export default class MediaFileFactory {
  static PROVIDER_GCB = 'GOOGLE_CLOUD_BUCKET';
  static PROVIDER_S3 = 'AMAZON_S3_BUCKET';

  constructor(provider = MediaFileFactory.PROVIDER_GCB) {
    this.provider = provider;
  }
  getMediaFile(mediaFileId) {
    switch (this.provider) {
      case MediaFileFactory.PROVIDER_GCB:
        return new GoogleCloudMediaFile(mediaFileId);
      break;
      case MediaFileFactory.PROVIDER_S3:
        // TODO: Implement MediaFile for S3
      break;
      default:
        throw new MediaFileError('Unknown provider'); 
      break;
    }
  }
}