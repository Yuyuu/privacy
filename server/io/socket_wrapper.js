'use strict';

let Player = require('../model/player');
let Answer = require('../model/answer');

const STORE = require('../model/store');
const EVENTS = require('./events');

class SocketWrapper {
  constructor(io) {
    this._io = io;
  }

  wrap(socket) {
    socket.on(EVENTS.ROOM.JOIN, (configuration, callback) => {
      let room = STORE.get(configuration.roomId);
      if (!room) {
        return callback({success: false, reason: 'The requested room does not exist'});
      }
      if (room.started) {
        return callback({success: false, reason: 'The game in the requested room has already started'});
      }
      return socket.join(room.id, error => {
        if (error) {
          callback({success: false, reason: 'An error occurred while trying to join the room'});
        } else {
          let player = socket.handshake.session.player;
          if (!player) {
            player = new Player(configuration.username, socket.id);
            socket.handshake.session.player = player;
          }
          room.add(player);
          socket.handshake.session.room = room;
          callback({success: true, room, player});
          socket.broadcast.to(room.id).emit(EVENTS.ROOM.NEW_PLAYER, player);
        }
      });
    });

    socket.on(EVENTS.CHAT.NEW_MESSAGE, (message, callback) => {
      let room = socket.handshake.session.room;
      let player = socket.handshake.session.player;
      let messageData = {sender: player.username, content: message};
      socket.broadcast.to(room.id).emit(EVENTS.CHAT.NEW_MESSAGE, messageData);
      callback({success: true, messageData: {sender: player.username, content: message}});
    });

    socket.on(EVENTS.GAME.START, (data, callback) => {
      let room = socket.handshake.session.room;
      if (!room.started) {
        room.started = true;
        room.startTurn();
        callback({success: true});
        this._io.to(room.id).emit(EVENTS.GAME.STARTED, room);
        this._io.to(room.id).emit(EVENTS.QUESTION.SETUP, room.playerSelectedForNextQuestion());
      } else {
        callback({success: false});
      }
    });

    socket.on(EVENTS.GAME.NEXT_TURN, (data, callback) => {
      let room = socket.handshake.session.room;
      if (!room.turnStarted) {
        room.startTurn();
        callback({success: true});
        this._io.to(room.id).emit(EVENTS.QUESTION.SETUP, room.playerSelectedForNextQuestion());
      } else {
        callback({success: false});
      }
    });

    socket.on(EVENTS.QUESTION.DEFINED, (question, callback) => {
      let room = socket.handshake.session.room;
      room.define(question);
      callback({success: true});
      this._io.to(room.id).emit(EVENTS.QUESTION.START, room.question.question);
    });

    socket.on(EVENTS.ANSWER.SAVE, (data, callback) => {
      let room = socket.handshake.session.room;
      let player = socket.handshake.session.player;
      let answer = new Answer(data.answer, data.yesCountGuess);
      room.question.answer(player, answer);
      callback({success: true});
      socket.broadcast.to(room.id).emit(EVENTS.ANSWER.GIVEN, player);
      if (room.turnIsOver()) {
        this._io.to(room.id).emit(EVENTS.GAME.TURN_OVER, room.questionResults());
        room.endTurn();
      }
    });

    socket.on(EVENTS.ROOM.LEAVE, _remove);

    socket.on(EVENTS.SOCKET.DISCONNECTION, _remove);

    function _remove() {
      let room = socket.handshake.session.room;
      let player = socket.handshake.session.player;
      // TODO *** remove entry from synchronizer if turn is started
      if (room) {
        room.remove(player);
        socket.broadcast.to(room.id).emit(EVENTS.ROOM.PLAYER_LEFT, player);
      }
    }
  }
}

module.exports = SocketWrapper;
