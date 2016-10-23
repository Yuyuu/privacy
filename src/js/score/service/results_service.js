export default class ResultsService {
  /* @ngInject */
  constructor(socketService, SocketEvents) {
    this.results = null;
    this.lastTurnResults = null;

    this._SocketEvents = SocketEvents;
    this._socketService = socketService;

    this._setupEventListeners();
  }

  _setupEventListeners() {
    this._socketService.on(this._SocketEvents.GAME.TURN_OVER, results => {
      this.results = results;
    });

    this._socketService.on(this._SocketEvents.QUESTION.SETUP, () => {
      if (this.results) {
        this.lastTurnResults = this.results;
        this.results = null;
      }
    });
  }
}
