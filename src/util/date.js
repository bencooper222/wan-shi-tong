const { parse } = require('date-fns');

const referencedParse = (dateStr, formatStr) => parse(dateStr, formatStr, new Date());
const cleverParseDate = dateStr => {
  const split = dateStr.split(' ');
  console.log(dateStr, split);

  const specced = [['y'], ['MMM', 'y'], ['MMM', 'd', 'y']];
  const formatStrings = specced.map(el => el.join(' '));

  for (let i = 1; i <= 3; i++) {
    if (split.length === i)
      return { specced: specced[i - 1], date: referencedParse(dateStr, formatStrings[i - 1]) };
  }

  if (split.length === 1) return referencedParse(dateStr, 'y');
  else if (split.length === 2) return referencedParse(dateStr, 'MMM y');
  else if (split.length === 3) return referencedParse(dateStr, 'MMM d y');

  throw new Error("Can't parse that");
};

module.exports = { cleverParseDate };
