const http = require('http');
const fs = require('fs');

const html = `<!doctype html><html><body>hello</body></html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
