class MulterS3Storage {
  constructor({ s3, bucket, uploadTo, ...rest }) {
    this.s3 = s3;
    this.bucket = bucket;
    this.uploadTo = uploadTo;
    this.otherOptions = rest;
  }

  _handleFile(req, file, cb) {
    const params = {
      Bucket: this.bucket,
      Key: this.uploadTo(req, file),
      Body: file.stream,
      ...this.otherOptions,
    };
    const upload = this.s3.upload(params);

    upload.send((err, result) => {
      if (err) return cb(err);

      cb(null, result);
    });
  }

  _removeFile(req, file, cb) {
    this.s3.deleteObject({ Bucket: file.bucket, Key: file.key }, cb);
  }
}

module.exports = ({ s3, bucket, uploadTo }) => {
  return new MulterS3Storage({ s3, bucket, uploadTo });
};
