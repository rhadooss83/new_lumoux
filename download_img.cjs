const https = require('https');
const fs = require('fs');

https.get('https://new-lumoux.vercel.app/velocity-kicks.webp', (res) => {
  const file = fs.createWriteStream('test.webp');
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Downloaded test.webp');
    const stats = fs.statSync('test.webp');
    console.log('Size:', stats.size);
    const header = fs.readFileSync('test.webp').slice(0, 20).toString('utf8');
    console.log('Header:', header);
  });
});
