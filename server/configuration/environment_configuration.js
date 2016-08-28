'use strict';

let config = require('12factor-config');

let appConfig = config({
  serverPort: {
    env: 'PORT',
    type: 'integer',
    default: 5000
  }
});

module.exports = appConfig;
