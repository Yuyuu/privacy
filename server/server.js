'use strict';

let express = require('express');
let path = require('path');
let serveStatic = require('serve-static');
let Revision = require('./revision');
let configuration = require('./configuration');

class Server {
  constructor() {
    this.app = express();
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'pug');
    this.app.use(serveStatic(path.join(__dirname, 'public')));
    require('./routes')(this.app);
    new Revision(path.join(__dirname, 'public', 'app', 'map.json'), 'app').register(this.app);
  }

  start() {
    console.log(`Configuring application for environment ${this.app.get('env')}`);
    let port = configuration.env.serverPort;
    this.app.listen(port, () => console.log(`Listening on port ${port}`));
  }
}

module.exports = Server;
