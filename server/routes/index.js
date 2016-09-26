'use strict';

let bodyParser = require('body-parser');

module.exports = (app) => {
  app.get('/', require('./home').index);
  app.get(/\/templates\/(.*)/, require('./templates').serve);
  app.post('/rooms', bodyParser.json(), require('./room').create);
  app.get('/rooms/:id', require('./room').get);
  app.get('*', (request, response) => response.redirect('/#/404'));
};
