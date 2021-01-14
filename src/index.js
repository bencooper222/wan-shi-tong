require('dotenv').config();

const { watch } = require('./watcher');
const { collect } = require('./collectMetadata');
const { createOrGetFolder, uploadImage } = require('./transports/googleDrive/');

const DIRECTORY_TO_WATCH = './';
const DRIVE_FOLDER_TO_UPLOAD = 'childhood-archive';

const watchHandler = async path => {
  const folderId = createOrGetFolder(DRIVE_FOLDER_TO_UPLOAD);
  const answers = await collect(path);
  console.log(answers);
};

const main = async () => {
  watch(DIRECTORY_TO_WATCH, watchHandler);
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
