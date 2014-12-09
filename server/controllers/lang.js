'use strict';

var config  = require('../../config/config');
var fs      = require('fs');
var path    = require('path');
var console = require('logbrok')(__filename);

exports.getLanguage = function(req, res){
  var lang = req.params.lang;
  var file = path.join(config.root, 'server/lang', lang+'.json');
  fs.exists(file, function(exists){
    if(exists){
      console.log('request getLanguage: language file', file, 'requested and sent');
      res.sendFile(file);
    }else{
      console.error('request getLanguage: language file', lang, 'not found');
      res.status(404).send('Not found');
    }
  });
};
