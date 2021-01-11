// add a non-image just to test file listening
const fs = require('fs');
const dir = './test';
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const genFileName = () =>
  `${new Array(5)
    .fill(0)
    .map(el => ALPHABET[Math.floor(Math.random() * ALPHABET.length)])
    .join('')}.jpeg`;

const name = genFileName();

fs.writeFileSync(`${dir}/${name}`, 'nothing');

console.log(`Wrote ${name}`);
