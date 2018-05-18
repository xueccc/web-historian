// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var archive = require('../helpers/archive-helpers');
var http = require('../web/http-helpers');

exports.archiveHelpers = () =>{
  archive.readListOfUrls((urlsArray)=>{
    console.log(urlsArray);
    archive.downloadUrls(urlsArray);
  });
};

