require('dotenv').config();

const { watch } = require('./watcher');
const { collect } = require('./collectMetadata');
const { uploadImage } = require('./transports/s3');
const { basename } = require('path');
const DIRECTORY_TO_WATCH = './store';

const processImage = async (path, pathPrefix, additionalMetadata = {}) => {
  const { answers } = await collect(path);

  try {
    await uploadImage(path, `${pathPrefix}/${basename(path)}`, {
      ...answers,
      ...additionalMetadata,
    });
    console.log(`Uploaded ${basename(path)}`);
  } catch (err) {
    console.error('Failed upload', path, err);
    process.exit(1);
  }
};

const main = async pathPrefix => {
  watch(DIRECTORY_TO_WATCH, path => void processImage(path, pathPrefix));
};

module.exports = { main };
