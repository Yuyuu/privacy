'use strict';

const EVENTS = require('../events');
const STATES = require('../../model/states');

exports.register = (socket, io) => {
  socket.on(EVENTS.GAME.START, (data, callback) => {
    let room = socket.handshake.session.room;
    if (!room.started) {
      room.started = true;
      room.state = STATES.WAITING_FOR_PLAYER_SELECTION;
      room.startTurn();
      callback({success: true});
      io.to(room.id).emit(EVENTS.GAME.STARTED, room);
      room.playerAwaitedForQuestion = room.selectPlayerForNextQuestion();
      room.state = STATES.WAITING_FOR_QUESTION_DEFINITION;
      io.to(room.id).emit(EVENTS.QUESTION.SETUP, room.playerAwaitedForQuestion);
    } else {
      callback({success: false});
    }
  });
};
