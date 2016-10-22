'use strict';

let shortId = require('shortid');

class Player {
  constructor(username, socketId) {
    this.id = shortId.generate();
    this.socketId = socketId;
    this.username = username;
  }
}

module.exports = Player;
