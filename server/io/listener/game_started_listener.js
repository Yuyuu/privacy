'use strict';

const EVENTS = require('../events');

exports.register = (socket, io) => {
  socket.on(EVENTS.GAME.START, (data, callback) => {
    let room = socket.handshake.session.room;
    if (!room.started) {
      room.started = true;
      room.startTurn();
      callback({success: true});
      io.to(room.id).emit(EVENTS.GAME.STARTED, room);
      room.playerAwaitedForQuestion = room.selectPlayerForNextQuestion();
      io.to(room.id).emit(EVENTS.QUESTION.SETUP, room.playerAwaitedForQuestion);
    } else {
      callback({success: false});
    }
  });
};
