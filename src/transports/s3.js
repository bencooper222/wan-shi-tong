// Import required AWS SDK clients and commands for Node.js
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const fs = require('fs');
const readFileAsync = require('util').promisify(fs.readFile);

const REGION = 'us-east-2'; //e.g. "us-east-1"
const baseUploadParams = { Bucket: process.env.S3_BUCKET }; //BUCKET_NAME, KEY (the name of the selected file),

// call S3 to retrieve upload file to specified bucket
const uploadImage = async (localPath, s3Path, metadata = {}) => {
  const s3 = new S3Client({ region: REGION });

  const buffer = await readFileAsync(path.resolve(localPath));
  console.log(metadata);
  const uploadParams = {
    ...baseUploadParams,
    Key: s3Path,
    Body: buffer,
    Metadata: metadata,
  };

  // catch error in caller
  await s3.send(new PutObjectCommand(uploadParams));
  return `https://s3.${REGION}.amazonaws.com/${process.env.S3_BUCKET}/${s3Path}`;
};

module.exports = { uploadImage };
