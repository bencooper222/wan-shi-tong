// Import required AWS SDK clients and commands for Node.js
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const fs = require('fs');

const REGION = 'us-east-2'; //e.g. "us-east-1"
const baseUploadParams = { Bucket: process.env.S3_BUCKET }; //BUCKET_NAME, KEY (the name of the selected file),

// call S3 to retrieve upload file to specified bucket
const uploadImage = async (localPath, s3Path, metadata = {}) => {
  const s3 = new S3Client({ region: REGION });
  const fileStream = fs.createReadStream(path.resolve(localPath));
  fileStream.on('error', function (err) {
    console.log('File Error', err);
  });

  const uploadParams = {
    ...baseUploadParams,
    Key: s3Path,
    Body: fileStream,
    Metadata: metadata,
  };

  // catch error in caller
  await s3.send(new PutObjectCommand(uploadParams));
};

module.exports = { uploadImage };
