'use strict';

let roomJoinedListener = require('./listener/room_joined_listener');
let chatMessageListener = require('./listener/chat_message_listener');
let gameStartedListener = require('./listener/game_started_listener');
let turnOverListener = require('./listener/turn_over_listener');
let questionDefinedListener = require('./listener/question_defined_listener');
let newAnswerListener = require('./listener/new_answer_listener');

const EVENTS = require('./events');

class SocketWrapper {
  constructor(io) {
    this._io = io;
  }

  wrap(socket) {
    roomJoinedListener.register(socket);
    chatMessageListener.register(socket);
    gameStartedListener.register(socket, this._io);
    turnOverListener.register(socket, this._io);
    questionDefinedListener.register(socket, this._io);
    newAnswerListener.register(socket, this._io);

    socket.on(EVENTS.ROOM.LEAVE, _remove);
    socket.on(EVENTS.SOCKET.DISCONNECTION, _remove);

    function _remove() {
      let room = socket.handshake.session.room;
      if (room) {
        let player = socket.handshake.session.player;
        room.remove(player);
        socket.broadcast.to(room.id).emit(EVENTS.ROOM.PLAYER_LEFT, player);
      }
    }
  }
}

module.exports = SocketWrapper;
