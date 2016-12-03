let _ = require('lodash');

export default class ScoreService {
  /* @ngInject */
  constructor(socketService, stateService, AppStates, SocketEvents) {
    this.scores = [];

    this._AppStates = AppStates;
    this._SocketEvents = SocketEvents;
    this._socketService = socketService;
    this._stateService = stateService;

    this._setupEventListeners();
  }

  add(player) {
    this.scores.push({player, score: 0});
  }

  initialize(players) {
    _.forEach(players, player => this.add(player));
  }

  reset() {
    this.scores = [];
  }

  _gameIsStarted() {
    return this._stateService.state !== this._AppStates.WAITING_FOR_GAME_TO_START;
  }

  _setupEventListeners() {
    this._socketService.on(this._SocketEvents.GAME.STARTED, room => {
      _.forEach(room.players, player => this.add(player));
    });

    this._socketService.on(this._SocketEvents.ROOM.NEW_PLAYER, player => {
      if (this._gameIsStarted()) {
        this.add(player);
      }
    });

    this._socketService.on(this._SocketEvents.ROOM.PLAYER_LEFT, formerPlayer => {
      if (this._gameIsStarted()) {
        _.remove(this.scores, score => score.player.id === formerPlayer.id);
      }
    });

    this._socketService.on(this._SocketEvents.GAME.TURN_OVER, results => {
      _.forEach(this.scores, scoreData => {
        let playerResults = results.details[scoreData.player.id];
        if (playerResults && playerResults.correct) {
          scoreData.score += 1;
        }
      });
    });
  }
}
