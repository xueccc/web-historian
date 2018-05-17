var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('../web/http-helpers');
// require more modules/folders here!
exports.handleRequest = function (req, res) {
  console.log(req.url);
  headers = http.headers;
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('./web/public/index.html', function(err, data) {
      if (err) { throw err; }
      res.writeHead(200, headers);
      res.end(data);
    });
  } else if (req.url === '/styles.css') {
    fs.readFile('./web/public/styles.css', function(err, data) {
      if (err) { throw err; }
      headers['Content-Type'] = 'text/css';
      res.writeHead(200, headers);
      res.end(data);
    });
  } else if (req.method === 'GET') {
    fs.stat(archive.paths.archivedSites + req.url, (err, stats) =>{
      if (err) {
        archive.addUrlToList(req.url, () => {
          fs.readFile('./web/public/loading.html', function(err, data) {
            if (err) { throw err; }
            res.writeHead(404, headers);
            res.end(data);
          });
        });
      } else {
        fs.readFile(archive.paths.archivedSites + req.url, function(err, data) {
          if (err) { throw err; }
          res.writeHead(200, headers);
          res.end(data);
        });
      }
    });
  } else if (req.method === 'POST') {
    let body = [];
    req.on('error', (err) => {
      console.error(err);
      res.writeHead(500, headers); 
      res.end(JSON.stringify(resultObj));
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = JSON.parse(Buffer.concat(body).toString()); 
      archive.addUrlToList(body, ()=> {
        res.writeHead(302, headers);
        res.end();
      });
    });
  }
  //res.end(archive.paths.list);
};
