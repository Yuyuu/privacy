'use strict';

let proxyMiddleware = require('http-proxy-middleware');

let configuration = require('../configuration');

module.exports.register = function (app) {
  let apiProxy = proxyMiddleware('/api/**', {
    target: configuration.env.apiUrl,
    changeOrigin: true
  });
  app.use(apiProxy);
};
