'use strict';

let _ = require('lodash');
let shortId = require('shortid');

let Question = require('./question');

class Room {
  constructor(name) {
    this.id = shortId.generate();
    this.name = name;
    this.players = [];
    this.dealer = null;
    this.started = false;
    this.turn = 0;
    this.turnStarted = false;
    this.question = null;
  }

  add(player) {
    this.players.push(player);
  }

  questionResults() {
    if (!this.question) {
      throw new Error('No question is defined for the room');
    }
    return this.question.results;
  }

  define(question) {
    this.question = new Question(question, this.players);
  }

  endTurn() {
    this.question = null;
    this.turnStarted = false;
  }

  isDealer(player) {
    return this.dealer && this.dealer.id === player.id;
  }

  get empty() {
    return this.players.length === 0;
  }

  playerSelectedForNextQuestion() {
    let nextPlayerIndex = (this.turn - 1) % this.players.length;
    return this.players[nextPlayerIndex];
  }

  remove(playerToRemove) {
    if (this.turnIsPending) {
      this.question.drop(playerToRemove);
    }
    _.remove(this.players, player => player.id === playerToRemove.id);
  }

  startTurn() {
    this.turn += 1;
    this.turnStarted = true;
  }

  get turnIsOver() {
    return this.question && this.question.hasCollectedAllAnswers;
  }

  get turnIsPending() {
    return this.question && !this.question.hasCollectedAllAnswers;
  }
}

module.exports = Room;
