var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.handleRequest = function (req, res) {
  headers = defaultCorsHeaders;
  if(req.url === '/'){
    fs.readFile('../web/public/index.html', function(data){
      headers['content-type'] = 'text/html';
      res.writeHead(200, headers);
      res.end(data.toString());
    });
  }
  //res.end(archive.paths.list);
};
