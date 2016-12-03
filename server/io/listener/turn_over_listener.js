'use strict';

const EVENTS = require('../events');
const STATES = require('../../model/states');

exports.register = (socket, io) => {
  socket.on(EVENTS.GAME.NEXT_TURN, (data, callback) => {
    let room = socket.handshake.session.room;
    if (!room.turnStarted) {
      room.startTurn();
      room.state = STATES.WAITING_FOR_PLAYER_SELECTION;
      callback({success: true});
      room.playerAwaitedForQuestion = room.selectPlayerForNextQuestion();
      room.state = STATES.WAITING_FOR_QUESTION_DEFINITION;
      io.to(room.id).emit(EVENTS.QUESTION.SETUP, room.playerAwaitedForQuestion);
    } else {
      callback({success: false});
    }
  });
};
