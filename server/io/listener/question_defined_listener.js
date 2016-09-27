'use strict';

const EVENTS = require('../events');

exports.register = (socket, io) => {
  socket.on(EVENTS.QUESTION.DEFINED, (question, callback) => {
    let room = socket.handshake.session.room;
    room.define(question);
    callback({success: true});
    io.to(room.id).emit(EVENTS.QUESTION.START, room.question.question);
  });
};
