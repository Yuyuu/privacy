'use strict';

const EVENTS = require('../events');

exports.register = (socket, io) => {
  socket.on(EVENTS.ROOM.NEW_DEALER, (dealer, callback) => {
    let room = socket.handshake.session.room;
    room.dealer = dealer;
    callback({success: true});
    io.to(room.id).emit(EVENTS.ROOM.DEALER_CHANGED, room.dealer);
  });
};
