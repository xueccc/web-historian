var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('../web/http-helpers');
// require more modules/folders here!
exports.handleRequest = function (req, res) {
  headers = http.headers;
  if(req.url === '/'){
    fs.readFile('./web/public/index.html', function(err, data){
      if (err) {throw err;}
      res.writeHead(200, headers);
      res.end(data);
    });
  } else if (req.url === '/styles.css'){
    fs.readFile('./web/public/styles.css', function(err, data){
      if(err){throw err;}
      headers['Content-Type'] = 'text/css';
      res.writeHead(200, headers);
      res.end(data);
    });
  }
  //res.end(archive.paths.list);
};
