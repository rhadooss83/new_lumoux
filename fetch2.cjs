const https = require('https');

function checkUrl(url) {
  https.get(url, (res) => {
    console.log(url, "->", res.statusCode, res.headers['content-type']);
  });
}

checkUrl('https://new-lumoux.vercel.app/burger-store.webp');
checkUrl('https://new-lumoux.vercel.app/Burger-Store.webp');
checkUrl('https://new-lumoux.vercel.app/alpine-serenity-inn.webp');
checkUrl('https://new-lumoux.vercel.app/Alpine-Serenity-Inn.webp');
checkUrl('https://new-lumoux.vercel.app/profile-picture.webp');
checkUrl('https://new-lumoux.vercel.app/profile.webp');
