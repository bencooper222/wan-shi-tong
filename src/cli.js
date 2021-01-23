const { main } = require('./index');

const options = require('yargs')
  .option('grade', { type: 'number', describe: 'What grade is this from?', demandOption: true })
  .option('subject', { type: 'string', describe: 'What subject is this from?', demandOption: true })
  .argv;

main(`${options.grade}/${options.subject}`).catch(err => {
  console.error(err);
  process.exit(1);
});
