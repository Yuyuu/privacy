'use strict';

let Player = require('../../model/player');

const EVENTS = require('../events');

exports.register = (socket, io) => {
  socket.on(EVENTS.GAME.JOIN, (username, callback) => {
    let room = socket.handshake.session.room;
    let isFirstPlayerInTheRoom = room.players.length === 0;
    if (!room) {
      callback({success: false, reason: 'The requested room does not exist'});
      return;
    }
    if (room.started) {
      callback({success: false, reason: 'The game in the requested room has already started'});
      return;
    }
    let player = socket.handshake.session.player;
    if (!player) {
      player = new Player(username, socket.id);
      socket.handshake.session.player = player;
    }
    room.add(player);
    callback({success: true, player});
    socket.broadcast.to(room.id).emit(EVENTS.ROOM.NEW_PLAYER, player);
    if (isFirstPlayerInTheRoom) {
      room.dealer = player;
      io.to(room.id).emit(EVENTS.ROOM.DEALER_CHANGED, room.dealer);
    }
  });
};
