const multer = require('multer');
const AWS = require('aws-sdk');
const storage = require('./../utils/multer-s3-storage');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION_NAME,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: storage({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    uploadTo: (req, file) => `medias/${Date.now()}-${file.originalname}`,
  }),
});

module.exports = upload;
