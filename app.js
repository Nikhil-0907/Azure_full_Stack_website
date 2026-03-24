const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

http.createServer((req, res) => {

  // Home page
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'public/index.html'), (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  }

  // CSS
  else if (req.url === '/style.css') {
    fs.readFile(path.join(__dirname, 'public/style.css'), (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(data);
    });
  }

  // JS
  else if (req.url === '/script.js') {
    fs.readFile(path.join(__dirname, 'public/script.js'), (err, data) => {
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.end(data);
    });
  }

  // API
  else if (req.url.startsWith('/api')) {
    const urlParts = new URL(req.url, `http://${req.headers.host}`);
    const name = urlParts.searchParams.get('name');

    const hour = new Date().getHours();
    let greeting = "Hello";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";
    else greeting = "Good Evening";

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ message: `${greeting}, ${name}` }));
  }

  // Default (VERY IMPORTANT)
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end("Not Found");
  }

}).listen(port);  