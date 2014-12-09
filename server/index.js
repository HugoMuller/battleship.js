'use strict';

// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config  = require('../config/config');
var console = require('logbrok')(__filename);
var express = require('express');
var app = express();
// Express settings
require('../config/express')(app);

// Start the app by listening on <port>
app.listen(config.port);
console.log('battleship.js started on port ' + config.port);

// Expose app
exports = module.exports = app;
