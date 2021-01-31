require('dotenv').config();

const { watch } = require('./watcher');
const { collect } = require('./collectMetadata');
const { uploadImage } = require('./transports/s3');
const { basename, resolve } = require('path');
const { readdir } = require('fs');
const { promisify } = require('util');
const readdirAsync = promisify(readdir);

const DIRECTORY_WITH_FILES = './test';

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

const mainWatch = async pathPrefix => {
  watch(DIRECTORY_WITH_FILES, path => void processImage(path, pathPrefix));
};

const mainIterateDirectory = async pathPrefix => {
  const files = await readdirAsync(DIRECTORY_WITH_FILES);
  for (const file of files) {
    await processImage(resolve(`${DIRECTORY_WITH_FILES}/${file}`), pathPrefix);
  }
};

const main = async pathPrefix => {
  // mainWatch(pathPrefix);
  mainIterateDirectory(pathPrefix);
};

module.exports = { main };
