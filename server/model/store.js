'use strict';

let _ = require('lodash');
const STORE = new Store();

function Store() {
  this.rooms = {};
}

Store.prototype.add = function (room) {
  this.rooms[room.id] = room;
};

Store.prototype.delete = function (room) {
  delete this.rooms[room.id];
};

Store.prototype.get = function (roomId) {
  return this.rooms[roomId];
};

Store.prototype.remove = function (room) {
  delete this.rooms[room.id];
};

function flushEmptyRooms() {
  _.forEach(STORE.rooms, room => {
    if (room.isEmpty()) {
      STORE.remove(room);
    }
  });
}

setInterval(flushEmptyRooms, 5 * 60 * 1000);

module.exports = STORE;
