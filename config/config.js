'use strict';

var rootPath = require('path').normalize(__dirname + '/..');
// the environment in which the app should run
// it could be 'test', 'development' or 'production'
var env = process.env.NODE_ENV || 'development';
if(['development', 'production', 'test'].indexOf(env) === -1) env = 'development';

/**************************** APPLICATION CONFIGURATION ***************************
 * configuration of the backend process.
 **********************************************************************************/
var config = {
  env: env,
  // root path of the app
  root: rootPath,
  // port on which the app should run
  port: process.env.PORT || (env !== 'test' ? 3000 : 3001),
  // the template engine for express, do not change this
  templateEngine: 'swig'
};

/******************************** APPLICATION NAME ********************************
 * Name to display in the web interface.
 **********************************************************************************/
var app = {
  development: {
    name: 'battleship.js - DEV'
  },
  production: {
    name: 'battleship.js'
  },
  test: {
    name: 'battleship.js - TEST'
  }
};
config.app = app[env];

module.exports = config;
