'use strict';

let shortId = require('shortid');

function Player(username, socketId) {
  this.id = shortId.generate();
  this.socketId = socketId;
  this.username = username;
  this.score = 0;
}

module.exports = Player;
