const https = require('https');

https.get('https://new-lumoux.vercel.app/assets/projects-LaiBptmo.js', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
});
