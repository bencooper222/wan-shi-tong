const { cleverParseDate } = require('./date');
const isNumber = num => !isNaN(Number(num));

module.exports = { isNumber, cleverParseDate };
