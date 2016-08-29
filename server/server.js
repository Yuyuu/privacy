'use strict';

let express = require('express');
let http = require('http');
let path = require('path');
let serveStatic = require('serve-static');
let morgan = require('morgan');
let Revision = require('./revision');
let configuration = require('./configuration');

class Server {
  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'pug');
    this.app.use(serveStatic(path.join(__dirname, 'public')));
    require('./routes')(this.app);
    new Revision(path.join(__dirname, 'public', 'app', 'map.json'), 'app').register(this.app);
    require('./io')(this.httpServer);
  }

  start() {
    let env = this.app.get('env');
    let port = configuration.env.serverPort;
    console.log(`Configuring application for environment ${env}`);
    if (env === 'development') {
      this.app.use(morgan('combined'));
    }
    this.httpServer.listen(port, () => console.log(`Listening on port ${port}`));
  }
}

module.exports = Server;
