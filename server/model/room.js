'use strict';

let _ = require('lodash');
let shortId = require('shortid');

let Question = require('./question');

function Room(name) {
  this.id = shortId.generate();
  this.name = name;
  this.players = [];
  this.started = false;
  this.turn = 0;
  this.turnStarted = false;
  this.question = null;
}

Room.prototype.add = function (player) {
  this.players.push(player);
};

Room.prototype.questionResults = function () {
  if (!this.question) {
    throw new Error('No question is defined for the room');
  }
  return this.question.results();
};

Room.prototype.define = function (question) {
  this.question = new Question(question, this.players);
};

Room.prototype.endTurn = function () {
  this.question = null;
  this.turnStarted = false;
};

Room.prototype.isEmpty = function () {
  return this.players.length === 0;
};

Room.prototype.playerSelectedForNextQuestion = function () {
  let nextPlayerIndex = (this.turn - 1) % this.players.length;
  return this.players[nextPlayerIndex];
};

Room.prototype.remove = function (playerToRemove) {
  if (this.turnIsPending()) {
    this.question.drop(playerToRemove);
  }
  _.remove(this.players, player => player.id === playerToRemove.id);
};

Room.prototype.startTurn = function () {
  this.turn += 1;
  this.turnStarted = true;
};

Room.prototype.turnIsOver = function () {
  return this.question && this.question.hasCollectedAllAnswers();
};

Room.prototype.turnIsPending = function () {
  return this.question && !this.question.hasCollectedAllAnswers();
};

module.exports = Room;
