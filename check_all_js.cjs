const https = require('https');

https.get('https://new-lumoux.vercel.app/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const jsFiles = [...data.matchAll(/href="(\/assets\/[^"]+\.js)"/g), ...data.matchAll(/src="(\/assets\/[^"]+\.js)"/g)].map(m => m[1]);
    console.log('Found JS files:', jsFiles);
    
    jsFiles.forEach(file => {
      https.get('https://new-lumoux.vercel.app' + file, (res2) => {
        let jsData = '';
        res2.on('data', (chunk) => { jsData += chunk; });
        res2.on('end', () => {
          if (jsData.includes('velocity-kicks.webp') || jsData.includes('Velocity-Kicks.webp')) {
            console.log(file, 'contains velocity-kicks.webp:', jsData.includes('velocity-kicks.webp'));
            console.log(file, 'contains Velocity-Kicks.webp:', jsData.includes('Velocity-Kicks.webp'));
          }
        });
      });
    });
  });
});
