const chokidar = require('chokidar');

const watch = (directory, handler) => {
  chokidar
    .watch(directory, {
      ignored: /node_modules|.git|.cache/,
      persistent: true,
      ignoreInitial: true,
    })
    .on('add', path => handler(path));
};

module.exports = { watch };
