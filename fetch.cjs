const https = require('https');

function checkUrl(url) {
  https.get(url, (res) => {
    console.log(url, "->", res.statusCode, res.headers['content-type']);
  });
}

checkUrl('https://new-lumoux.vercel.app/FurDeco.webp');
checkUrl('https://new-lumoux.vercel.app/furdeco.webp');
checkUrl('https://new-lumoux.vercel.app/ChocoLuxe.webp');
checkUrl('https://new-lumoux.vercel.app/chocoluxe.webp');
checkUrl('https://new-lumoux.vercel.app/Crypto.webp');
checkUrl('https://new-lumoux.vercel.app/crypto.webp');
