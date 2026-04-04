const fs = require('fs');
const stats = fs.statSync('dist/velocity-kicks.webp');
console.log('Size in dist:', stats.size);
const data = fs.readFileSync('dist/velocity-kicks.webp');
console.log('Hex in dist:', data.slice(0, 50).toString('hex'));
