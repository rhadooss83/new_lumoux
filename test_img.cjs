const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, {
  url: "http://localhost:3000/",
  resources: "usable"
});

const img = dom.window.document.createElement('img');
img.onload = () => console.log('onload fired');
img.onerror = () => console.log('onerror fired');
img.src = 'http://localhost:3000/fake.webp';
