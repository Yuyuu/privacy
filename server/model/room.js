'use strict';

let _ = require('lodash');
let shortId = require('shortid');

function Room(name) {
  this.id = shortId.generate();
  this.name = name;
  this.players = [];
}

Room.prototype.add = function (player) {
  this.players.push(player);
};

Room.prototype.isEmpty = function () {
  return this.players.length === 0;
};

Room.prototype.remove = function (playerToRemove) {
  _.remove(this.players, player => player.id === playerToRemove.id);
};

module.exports = Room;
