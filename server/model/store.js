'use strict';

const STORE = new Store();

function Store() {
  this.rooms = {};
}

Store.prototype.add = function (room) {
  this.rooms[room.id] = room;
};

Store.prototype.get = function (roomId) {
  return this.rooms[roomId];
};

module.exports = STORE;
