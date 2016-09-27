'use strict';

let Player = require('../../model/player');

const STORE = require('../../model/store');
const EVENTS = require('../events');

exports.register = socket => {
  socket.on(EVENTS.ROOM.JOIN, (configuration, callback) => {
    let room = STORE.get(configuration.roomId);
    if (!room) {
      return callback({success: false, reason: 'The requested room does not exist'});
    }
    if (room.started) {
      return callback({success: false, reason: 'The game in the requested room has already started'});
    }
    return socket.join(room.id, error => {
      if (error) {
        callback({success: false, reason: 'An error occurred while trying to join the room'});
      } else {
        let player = socket.handshake.session.player;
        if (!player) {
          player = new Player(configuration.username, socket.id);
          socket.handshake.session.player = player;
        }
        room.add(player);
        socket.handshake.session.room = room;
        callback({success: true, room, player});
        socket.broadcast.to(room.id).emit(EVENTS.ROOM.NEW_PLAYER, player);
      }
    });
  });
};
