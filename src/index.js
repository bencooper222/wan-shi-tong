const { watch } = require('./watcher');
const { collect } = require('./collectMetadata');

const watchHandler = async path => {
  const answers = await collect(path);
  console.log(answers);
};

const main = async () => {
  watch('./', watchHandler);
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
