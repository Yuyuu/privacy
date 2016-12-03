'use strict';

let Room = require('../model/room');

const STORE = require('../model/store');

exports.create = (request, response) => {
  let roomName = request.body.name;
  if (!roomName) {
    return response.status(400).send(buildError('The name of the room is required'));
  }
  let room = new Room(roomName);
  STORE.add(room);
  return response.status(201).send(room);
};

exports.get = (request, response) => {
  let roomId = request.params.id;
  let room = STORE.get(roomId);
  if (!room) {
    return response.status(404).send(buildError('The requested room does not exist'));
  }
  return response.send(room);
};

function buildError(message) {
  return {
    errors: [
      {
        message: message
      }
    ]
  };
}
