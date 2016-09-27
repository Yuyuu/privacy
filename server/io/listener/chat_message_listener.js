'use strict';

const EVENTS = require('../events');

exports.register = socket => {
  socket.on(EVENTS.CHAT.NEW_MESSAGE, (message, callback) => {
    let room = socket.handshake.session.room;
    let player = socket.handshake.session.player;
    let messageData = {sender: player.username, content: message};
    socket.broadcast.to(room.id).emit(EVENTS.CHAT.NEW_MESSAGE, messageData);
    callback({success: true, messageData: {sender: player.username, content: message}});
  });
};
