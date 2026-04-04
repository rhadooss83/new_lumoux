const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('response', response => {
    if (response.request().resourceType() === 'image') {
      console.log('Image loaded:', response.url(), response.status());
    }
  });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('https://new-lumoux.vercel.app/portfolio', { waitUntil: 'networkidle0' });
  
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    }));
  });
  
  console.log('Images on page:', images);
  
  await browser.close();
})();
