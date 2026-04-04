const https = require('https');

https.get('https://new-lumoux.vercel.app/velocity-kicks.webp', (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Body start:', data.substring(0, 200));
  });
});
