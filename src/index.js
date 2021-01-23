require('dotenv').config();

const { watch } = require('./watcher');
const { collect } = require('./collectMetadata');
const { uploadImage } = require('./transports/s3');
const { isNumber } = require('./util');
const DIRECTORY_TO_WATCH = './store';

const processImage = async (path, additionalMetadata) => {
  const { answers } = await collect(path);
  const { title, ...rest } = answers;

  try {
    await uploadImage(path, `${title}.jpeg`, { ...rest, ...additionalMetadata });
    console.log(`Uploaded ${title}.jpeg`);
  } catch (err) {
    console.error('Failed upload', path, err);
    process.exit(1);
  }
};

const main = async () => {
  const grade = process.argv[2] ?? -1;
  if (!isNumber(grade)) throw new Error('grade must be number');

  watch(DIRECTORY_TO_WATCH, path => void processImage(path, { grade: grade.toString() }));
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
