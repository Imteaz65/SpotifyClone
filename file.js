const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Define the path to your folder
  const folderPath = 'songs/';

  // Construct the absolute path for the requested resource
  const filePath = path.join(__dirname, folderPath, req.url);
  console.log(filePath);
  // Read the file and send it in the response
  fs.readFile(filePath, (err, data) => {
    if (err) {
        
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');

      
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
