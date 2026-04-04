const https = require('https');

https.get('https://new-lumoux.vercel.app/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const jsFileMatch = data.match(/src="(\/assets\/index-[^"]+\.js)"/);
    if (jsFileMatch) {
      console.log('Found JS file:', jsFileMatch[1]);
      https.get('https://new-lumoux.vercel.app' + jsFileMatch[1], (res2) => {
        let jsData = '';
        res2.on('data', (chunk) => { jsData += chunk; });
        res2.on('end', () => {
          console.log('JS file contains velocity-kicks.webp?', jsData.includes('velocity-kicks.webp'));
          console.log('JS file contains Velocity-Kicks.webp?', jsData.includes('Velocity-Kicks.webp'));
        });
      });
    } else {
      console.log('No JS file found in HTML');
    }
  });
});
