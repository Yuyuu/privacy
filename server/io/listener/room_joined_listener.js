'use strict';

const STORE = require('../../model/store');
const EVENTS = require('../events');

exports.register = socket => {
  socket.on(EVENTS.ROOM.JOIN, (roomId, callback) => {
    let room = STORE.get(roomId);
    if (!room) {
      return callback({success: false, reason: 'The requested room does not exist'});
    }
    return socket.join(room.id, error => {
      if (error) {
        callback({success: false, reason: 'An error occurred while trying to join the room'});
      } else {
        socket.handshake.session.room = room;
        callback({success: true, room});
      }
    });
  });
};
