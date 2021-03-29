const fs = require('fs');

// readFileSync
// console.log('A');
// const result = fs.readFileSync('syntax/sample.txt', 'utf-8');
// console.log(result)
// console.log('B');
// console.log('C');

// readFile
console.log('A');
fs.readFile('syntax/sample.txt', 'utf-8', (error, result) => {
  console.log(result);
});
console.log('B');
console.log('C');