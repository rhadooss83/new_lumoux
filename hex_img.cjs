const fs = require('fs');

const data = fs.readFileSync('test.webp');
console.log(data.slice(0, 100).toString('hex'));
