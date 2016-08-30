'use strict';

let _ = require('lodash');
let uuid = require('node-uuid');

function Room(name) {
  this.id = uuid.v4();
  this.name = name;
  this.players = [];
}

Room.prototype.add = function (player) {
  this.players.push(player);
};

Room.prototype.remove = function (playerToRemove) {
  _.remove(this.players, player => player.id === playerToRemove.id);
};

module.exports = Room;
