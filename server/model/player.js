'use strict';

let uuid = require('node-uuid');

function Player(username, socketId) {
  this.id = uuid.v4();
  this.socketId = socketId;
  this.username = username;
}

module.exports = Player;
