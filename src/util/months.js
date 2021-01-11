const months = [
  {
    abbreviation: 'Jan',
    name: 'January',
  },
  {
    abbreviation: 'Feb',
    name: 'February',
  },
  {
    abbreviation: 'Mar',
    name: 'March',
  },
  {
    abbreviation: 'Apr',
    name: 'April',
  },
  {
    abbreviation: 'May',
    name: 'May',
  },
  {
    abbreviation: 'Jun',
    name: 'June',
  },
  {
    abbreviation: 'Jul',
    name: 'July',
  },
  {
    abbreviation: 'Aug',
    name: 'August',
  },
  {
    abbreviation: 'Sep',
    name: 'September',
  },
  {
    abbreviation: 'Oct',
    name: 'October',
  },
  {
    abbreviation: 'Nov',
    name: 'November',
  },
  {
    abbreviation: 'Dec',
    name: 'December',
  },
];

const map = months.reduce((acc, el, idx) => {
  acc[el.name] = idx + 1;
  acc[el.abbreviation] = idx + 1;

  return acc;
}, {});

module.exports = { months: map };
