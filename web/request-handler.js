var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('../web/http-helpers');
var _ = require('underscore');
var archiveHelpers = require('../workers/htmlfetcher');
// require more modules/folders here!
exports.handleRequest = function (req, res) {
  console.log(req.url);
  console.log(req.method);
  headers = http.headers;
  console.log(headers);
  archiveHelpers.archiveHelpers();
  
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('./web/public/index.html', function(err, data) {
      if (err) { throw err; }
      res.writeHead(200, headers);
      res.end(data);
    });
  } else if (req.url === '/styles.css') {
    fs.readFile('./web/public/styles.css', function(err, data) {
      if (err) { throw err; }
      var newHeaders = headers;
      console.log(headers);
      newHeaders['Content-Type'] = 'text/css';
      res.writeHead(200, newHeaders);
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
      res.end();
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      body = body.slice(4);
      console.log(body);
      archive.isUrlArchived(body, (exist)=>{
        if (!exist) {
          archive.addUrlToList(body + '\n', ()=> {
            res.writeHead(302, headers);
            res.end();
          });
        } else {
          fs.readFile(archive.paths.archivedSites + '/' + body, function(err, data) {
            if (err) { throw err; }
            res.writeHead(200, headers);
            res.end(data);
          });
        }
      });
    });
  }
  //res.end(archive.paths.list);
};
