const fs = require('fs');
console.log('Start');
fs.readFile('./file.txt', (err, data) => {
  if (err) { throw err; }
  console.log('data', data.toString());
});
console.log('end');
