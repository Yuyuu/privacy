'use strict';

let _ = require('lodash');

class Question {
  constructor(question, players) {
    this.question = question;
    this.players = players;
    this.answers = {};

    this._synchronizer = {};
    _.forEach(this.players, player => {
      this.answers[player.id] = null;
      this._synchronizer[player.id] = false;
    });
  }

  answer(player, answer) {
    this.answers[player.id] = answer;
    this._synchronizer[player.id] = true;
  }

  drop(player) {
    delete this.answers[player.id];
    delete this._synchronizer[player.id];
  }

  get hasCollectedAllAnswers() {
    return _.every(this._synchronizer, synced => synced);
  }

  get results() {
    let yesCount = _.reduce(this.answers, (sum, answer) => sum + (answer.value === 'YES' ? 1 : 0), 0);
    let results = {yesCount, details: {}};
    _.forEach(this.players, player => {
      results.details[player.id] = {
        yesCountGuess: this.answers[player.id].yesCountGuess,
        correct: this.answers[player.id].yesCountGuess === yesCount
      };
    });
    return results;
  }
}

module.exports = Question;
