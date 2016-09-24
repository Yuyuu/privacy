export default class BoardService {
  /* @ngInject */
  constructor(socketService, playerService, SocketEvents, stateService) {
    this.playerSelectedForNextQuestion = null;
    this.question = null;
    this.waitingPlayersIds = [];

    this._playerService = playerService;
    this._SocketEvents = SocketEvents;
    this._socketService = socketService;
    this._stateService = stateService;

    this._setupEventListeners();
  }

  submitAnswer(data) {
    return this._socketService.promisifyEmit(this._SocketEvents.ANSWER.SAVE, data)
      .then(() => this.waitingPlayersIds.push(this._playerService.player.id));
  }

  define(question) {
    return this._socketService.promisifyEmit(this._SocketEvents.QUESTION.DEFINED, question);
  }

  startGame() {
    return this._socketService.promisifyEmit(this._SocketEvents.GAME.START);
  }

  startNextTurn() {
    return this._socketService.promisifyEmit(this._SocketEvents.GAME.NEXT_TURN);
  }

  _setupEventListeners() {
    this._socketService.on(this._SocketEvents.QUESTION.SETUP, player => {
      this.question = null;
      this.waitingPlayersIds = [];
      this.results = null;
      this.playerSelectedForNextQuestion = player;
      this._stateService.playerDefined();
    });

    this._socketService.on(this._SocketEvents.QUESTION.START, question => {
      this.playerSelectedForNextQuestion = null;
      this.question = question;
      this._stateService.questionDefined();
    });

    this._socketService.on(this._SocketEvents.ANSWER.GIVEN, player => {
      this.waitingPlayersIds.push(player.id);
    });

    this._socketService.on(this._SocketEvents.GAME.TURN_OVER, results => {
      this.results = results;
      this._stateService.turnOver();
    });
  }
}
