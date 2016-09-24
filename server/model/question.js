'use strict';

let _ = require('lodash');

function Question(question, players) {
  this.question = question;
  this.players = players;
  this.answers = {};

  this._synchronizer = {};
  _.forEach(this.players, player => {
    this.answers[player.id] = null;
    this._synchronizer[player.id] = false;
  });
}

Question.prototype.answer = function (player, answer) {
  this.answers[player.id] = answer;
  this._synchronizer[player.id] = true;
};

Question.prototype.hasCollectedAllAnswers = function () {
  return _.every(this._synchronizer, synced => synced);
};

Question.prototype.results = function () {
  let yesCount = _.reduce(this.answers, (sum, answer) => sum + (answer.value === 'YES' ? 1 : 0), 0);
  let results = {yesCount, details: {}};
  _.forEach(this.players, player => {
    results.details[player.id] = {
      yesCountGuess: this.answers[player.id].yesCountGuess,
      correct: this.answers[player.id].yesCountGuess === yesCount
    };
  });
  return results;
};

module.exports = Question;
