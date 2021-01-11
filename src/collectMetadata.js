const inquirer = require('inquirer');
const { cleverParseDate } = require('./util/date');

const questions = path => [
  { type: 'input', name: 'title', message: `Title this ${path}`, validate: str => str !== '' },
  { type: 'input', name: 'describe', message: 'Describe it.' },
  {
    type: 'input',
    name: 'date',
    message: 'Approximate date?',
    validate: (val, answers, flags) => {
      try {
        cleverParseDate(val);
        return true;
      } catch (err) {
        return false;
      }
    },
  },
];

const collect = async path => {
  const answers = await inquirer.prompt(questions(path));
  answers.date = cleverParseDate(answers.date); // should be the default behavior but inquirer is dumb
  return { answers, path };
};

module.exports = { collect };
