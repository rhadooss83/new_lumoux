const fs = require('fs');
const stats = fs.statSync('public/velocity-kicks.webp');
console.log('Size in public:', stats.size);
const header = fs.readFileSync('public/velocity-kicks.webp').slice(0, 20).toString('utf8');
console.log('Header in public:', header);
