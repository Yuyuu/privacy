'use strict';

const EVENTS = require('../events');

exports.register = (socket, io) => {
  socket.on(EVENTS.GAME.NEXT_TURN, (data, callback) => {
    let room = socket.handshake.session.room;
    if (!room.turnStarted) {
      room.startTurn();
      callback({success: true});
      room.playerAwaitedForQuestion = room.selectPlayerForNextQuestion();
      io.to(room.id).emit(EVENTS.QUESTION.SETUP, room.playerAwaitedForQuestion);
    } else {
      callback({success: false});
    }
  });
};
