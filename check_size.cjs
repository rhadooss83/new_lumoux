const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.webp'));
let totalSize = 0;
files.forEach(f => {
  totalSize += fs.statSync(path.join(publicDir, f)).size;
});
console.log('Total images:', files.length);
console.log('Total size:', totalSize / 1024 / 1024, 'MB');
