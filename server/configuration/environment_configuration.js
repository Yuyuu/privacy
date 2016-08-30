'use strict';

let config = require('12factor-config');

let appConfig = config({
  serverPort: {
    env: 'PORT',
    type: 'integer',
    default: 5000
  },
  sessionCookieSecret: {
    env: 'SESSION_COOKIE_SECRET',
    type: 'string',
    default: 'secret'
  }
});

module.exports = appConfig;
