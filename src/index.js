require('dotenv').config();

const { watch } = require('./watcher');
const { collect } = require('./collectMetadata');
const { uploadImage } = require('./transports/s3');

const DIRECTORY_TO_WATCH = './';

const processImage = async path => {
  const { answers } = await collect(path);
  const { title, ...rest } = answers;

  try {
    await uploadImage(path, `${title}.jpeg`, rest);
    console.log(`Uploaded ${title}.jpeg`);
  } catch (err) {
    console.error('Failed upload', path, err);
    process.exit(1);
  }
};

const main = async () => {
  watch(DIRECTORY_TO_WATCH, processImage);
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
