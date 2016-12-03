'use strict';

let roomJoinedListener = require('./listener/room_joined_listener');
let gameJoinedListener = require('./listener/game_joined_listener');
let chatMessageListener = require('./listener/chat_message_listener');
let gameStartedListener = require('./listener/game_started_listener');
let turnOverListener = require('./listener/turn_over_listener');
let questionDefinedListener = require('./listener/question_defined_listener');
let newAnswerListener = require('./listener/new_answer_listener');
let newDealerListener = require('./listener/new_dealer_listener');

const EVENTS = require('./events');

class SocketWrapper {
  constructor(io) {
    this._io = io;
  }

  wrap(socket) {
    let wrapper = this;
    roomJoinedListener.register(socket);
    gameJoinedListener.register(socket, this._io);
    chatMessageListener.register(socket);
    gameStartedListener.register(socket, this._io);
    turnOverListener.register(socket, this._io);
    questionDefinedListener.register(socket, this._io);
    newAnswerListener.register(socket, this._io);
    newDealerListener.register(socket, this._io);

    socket.on(EVENTS.ROOM.LEAVE, (data, callback) => {
      let room = socket.handshake.session.room;
      if (room) {
        socket.leave(room.id, error => {
          if (error) {
            callback({success: false, reason: 'An error occurred while trying to leave the room'});
          } else {
            cleanUp();
            callback({success: true});
          }
        });
      }
    });
    socket.on(EVENTS.SOCKET.DISCONNECTION, cleanUp);

    function cleanUp() {
      let room = socket.handshake.session.room;
      if (!room) {
        return;
      }
      socket.handshake.session.room = null;
      let player = socket.handshake.session.player;
      if (player) {
        room.remove(player);
        socket.handshake.session.player = null;
        socket.broadcast.to(room.id).emit(EVENTS.ROOM.PLAYER_LEFT, player);
        if (room.isDealer(player) && !room.empty) {
          room.dealer = room.players[0];
          wrapper._io.to(room.id).emit(EVENTS.ROOM.DEALER_CHANGED, room.dealer);
        }
        if (room.turnIsOver) {
          wrapper._io.to(room.id).emit(EVENTS.GAME.TURN_OVER, room.questionResults());
          room.endTurn();
        }
        if (room.playerAwaitedForQuestion && room.playerAwaitedForQuestion.id === player.id) {
          room.playerAwaitedForQuestion = room.selectPlayerForNextQuestion();
          wrapper._io.to(room.id).emit(EVENTS.QUESTION.SETUP, room.playerAwaitedForQuestion);
        }
      }
    }
  }
}

module.exports = SocketWrapper;
