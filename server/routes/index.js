'use strict';

module.exports = (app) => {
  app.get('/', require('./home').index);
  app.get(/\/templates\/(.*)/, require('./templates').serve);
};
