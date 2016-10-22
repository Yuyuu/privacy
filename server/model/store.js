'use strict';

let _ = require('lodash');

class Store {
  constructor() {
    this.rooms = {};
  }

  add(room) {
    this.rooms[room.id] = room;
  }

  get(roomId) {
    return this.rooms[roomId];
  }

  remove(room) {
    delete this.rooms[room.id];
  }
}

const STORE = new Store();

function flushEmptyRooms() {
  _.forEach(STORE.rooms, room => {
    if (room.isEmpty()) {
      STORE.remove(room);
    }
  });
}

setInterval(flushEmptyRooms, 5 * 60 * 1000);

module.exports = STORE;
