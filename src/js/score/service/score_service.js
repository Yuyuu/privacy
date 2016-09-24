let _ = require('lodash');

export default class ScoreService {
  /* @ngInject */
  constructor(socketService, SocketEvents) {
    this.scores = [];

    this._SocketEvents = SocketEvents;
    this._socketService = socketService;

    this._setupEventListeners();
  }

  _setupEventListeners() {
    this._socketService.on(this._SocketEvents.GAME.STARTED, room => {
      _.forEach(room.players, player => this.scores.push({playerId: player.id, username: player.username, score: 0}));
    });

    this._socketService.on(this._SocketEvents.GAME.TURN_OVER, results => {
      _.forEach(this.scores, scoreData => {
        let playerResults = results.details[scoreData.playerId];
        if (playerResults.correct) {
          scoreData.score += 1;
        }
      });
    });
  }
}
