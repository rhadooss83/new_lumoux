const https = require('https');

function checkUrl(url) {
  https.get(url, (res) => {
    console.log(url, "->", res.statusCode, res.headers['content-type']);
  });
}

checkUrl('https://new-lumoux.vercel.app/velocity-kicks-1.webp');
checkUrl('https://new-lumoux.vercel.app/Velocity-Kicks-1.webp');
checkUrl('https://new-lumoux.vercel.app/velocity-kicks.webp');
checkUrl('https://new-lumoux.vercel.app/Velocity-Kicks.webp');
