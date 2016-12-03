let _ = require('lodash');

export default class BoardService {
  /* @ngInject */
  constructor(socketService, playerService, SocketEvents, stateService) {
    this.playerSelectedForNextQuestion = {};
    this.question = {};
    this.waitingPlayersIds = [];

    this._playerService = playerService;
    this._SocketEvents = SocketEvents;
    this._socketService = socketService;
    this._stateService = stateService;

    this._setupEventListeners();
  }

  define(question) {
    return this._socketService.promisifyEmit(this._SocketEvents.QUESTION.DEFINED, question);
  }

  initialize(room) {
    this.question = room.question || {};
    this.playerSelectedForNextQuestion = room.playerAwaitedForQuestion;
  }

  reset() {
    this.playerSelectedForNextQuestion = {};
    this.question = {};
    this.waitingPlayersIds = [];
  }

  startGame() {
    return this._socketService.promisifyEmit(this._SocketEvents.GAME.START);
  }

  startNextTurn() {
    return this._socketService.promisifyEmit(this._SocketEvents.GAME.NEXT_TURN);
  }

  submitAnswer(data) {
    return this._socketService.promisifyEmit(this._SocketEvents.ANSWER.SAVE, data)
      .then(() => this.waitingPlayersIds.push(this._playerService.player.id));
  }

  get currentPlayerIsIncludedInQuestion() {
    return this._playerService.player &&
      _.filter(this.question.players, player => player.id === this._playerService.player.id).length > 0;
  }

  _setupEventListeners() {
    this._socketService.on(this._SocketEvents.QUESTION.SETUP, player => {
      this.question = {};
      this.waitingPlayersIds = [];
      this.playerSelectedForNextQuestion = player;
    });

    this._socketService.on(this._SocketEvents.QUESTION.START, question => {
      this.playerSelectedForNextQuestion = {};
      this.question = question;
    });

    this._socketService.on(this._SocketEvents.ANSWER.GIVEN, player => {
      this.waitingPlayersIds.push(player.id);
    });

    this._socketService.on(this._SocketEvents.ROOM.PLAYER_LEFT, formerPlayer => {
      if (this.question.question) {
        _.remove(this.question.players, player => player.id === formerPlayer.id);
      }
    });
  }
}
