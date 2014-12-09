'use strict';

var lang = require('../controllers/lang');

module.exports = function(app){
  app.get('/getLanguage/:lang', lang.getLanguage);
};
