var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  return fs.readFile(exports.paths.list, (err, data) => {
    
    var newData = data.toString().split('\n');
    callback(newData);
  });
};

exports.isUrlInList = function(url, callback) {

  exports.readListOfUrls((listURLS) => {
    var exists = listURLS.includes(url);
    callback(exists);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.open(exports.paths.list, 'a', (err, fd) => {
    fs.write(fd, url, () =>{
      fs.close(fd, () => {
        callback(true);
      });     
    });
  });
};

exports.isUrlArchived = function(url, callback) {
  return fs.access(exports.paths.archivedSites + '/' + url, (err) => {
    if(err){
      callback(false);
    }else{
      callback(true);
    }
  });
};

exports.downloadUrls = function(urls) {
  for(var i = 0; i < urls.length; i++){
    
  }
};
