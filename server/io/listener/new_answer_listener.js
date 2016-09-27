'use strict';

let Answer = require('../../model/answer');

const EVENTS = require('../events');

exports.register = (socket, io) => {
  socket.on(EVENTS.ANSWER.SAVE, (data, callback) => {
    let room = socket.handshake.session.room;
    let player = socket.handshake.session.player;
    let answer = new Answer(data.answer, data.yesCountGuess);
    room.question.answer(player, answer);
    callback({success: true});
    socket.broadcast.to(room.id).emit(EVENTS.ANSWER.GIVEN, player);
    if (room.turnIsOver()) {
      io.to(room.id).emit(EVENTS.GAME.TURN_OVER, room.questionResults());
      room.endTurn();
    }
  });
};
