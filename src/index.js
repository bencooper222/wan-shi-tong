require('dotenv').config();

const { watch } = require('./watcher');
const { collect } = require('./collectMetadata');
const { uploadImage } = require('./transports/s3');
const DIRECTORY_TO_WATCH = './store';

const processImage = async (path, pathPrefix, additionalMetadata = {}) => {
  const { answers } = await collect(path);
  const { title, ...rest } = answers;

  try {
    await uploadImage(path, `${pathPrefix}/${title}.jpeg`, { ...rest, ...additionalMetadata });
    console.log(`Uploaded ${title}.jpeg`);
  } catch (err) {
    console.error('Failed upload', path, err);
    process.exit(1);
  }
};

const main = async pathPrefix => {
  watch(DIRECTORY_TO_WATCH, path => void processImage(path, pathPrefix));
};

module.exports = { main };
