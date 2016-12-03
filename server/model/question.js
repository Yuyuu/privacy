'use strict';

let _ = require('lodash');

class Question {
  constructor(question, players) {
    this.question = question;
    this.players = _.clone(players);
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

  drop(playerToDrop) {
    _.remove(this.players, player => player.id === playerToDrop.id);
    delete this.answers[playerToDrop.id];
    delete this._synchronizer[playerToDrop.id];
  }

  get hasCollectedAllAnswers() {
    return _.every(this._synchronizer, synced => synced);
  }

  get results() {
    let yesCount = _.reduce(this.answers, (sum, answer) => sum + (answer.value === 'YES' ? 1 : 0), 0);
    let results = {question: this.question, yesCount, details: {}};
    _.forEach(this.players, player => {
      results.details[player.id] = {
        player,
        yesCountGuess: this.answers[player.id].yesCountGuess,
        correct: this.answers[player.id].yesCountGuess === yesCount
      };
    });
    return results;
  }
}

module.exports = Question;
