'use strict';

var config       = require('../config/config');
var consolidate  = require('consolidate');
var express      = require('express');
var assetmanager = require('assetmanager');
var bodyParser   = require('body-parser');
var load         = require('roda');
var console      = require('logbrok')(__filename);

module.exports = function(app){
  /*************************** MIDDLEWARE BEFORE ROUTES ***************************/
  app.set('showStackError', true);
  // assign the template engine to .html files
  app.engine('html', consolidate[config.templateEngine]);
  // set .html as the default extension
  app.set('view engine', 'html');
  // Set views path, template engine and default layout
  app.set('views', config.root + '/server/views');
  // Enable jsonp
  app.enable('jsonp callback');
  // The cookieParser should be above session
  app.use(require('cookie-parser')());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // Import and add assets to local variables
  app.use(function (req, res, next) {
    res.locals.assets = assetmanager.process({
      assets: require('../config/assets.json'),
      debug: (config.env !== 'production'),
      webroot: 'public'
    });
    next();
  });
  // Dynamic helpers
  app.use(require('view-helpers')(config.app.name));
  /********************************************************************************/

  /************************************ ROUTES ************************************/
    // Bootstrap routes
  load({
    include: config.root + '/server/routes',
    callback: function(plugin, name){
      console.log('loading', name, 'route...');
      plugin(app);
  }});
  /********************************************************************************/

  /*************************** MIDDLEWARE AFTER ROUTES ***************************/
  app.use(express.static('public'));
  // Assume "not found" in the error msgs is a 404. this is somewhat
  // silly, but valid, you can do whatever you like, set properties,
  // use instanceof etc.
  app.use(function(err, req, res, next){
    // Treat as 404
    if(~err.message.indexOf('not found')) return next();
    console.error(err.stack);
    res.status(500).render('500', {
        error: {
          code: 500,
          msg: err.stack
        }
      });
  });
  // Assume 404 since no middleware responded
  app.use(function(req, res){
    res.status(404).render('404', {
        url: req.originalUrl,
        error: {
          code: 404, 
          msg: 'Not found'
        }
      });
  });
  /********************************************************************************/
};
