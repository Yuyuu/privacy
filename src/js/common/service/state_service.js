export default class StateService {
  /* @ngInject */
  constructor(socketService, AppStates, SocketEvents) {
    this.state = AppStates.WAITING_FOR_GAME_TO_START;

    this._AppStates = AppStates;
    this._SocketEvents = SocketEvents;
    this._socketService = socketService;

    this._setupEventListeners();
  }

  reset() {
    this.state = this._AppStates.WAITING_FOR_GAME_TO_START;
  }

  _setupEventListeners() {
    this._socketService.on(this._SocketEvents.GAME.STARTED, () => {
      this.state = this._AppStates.WAITING_FOR_PLAYER_SELECTION;
    });

    this._socketService.on(this._SocketEvents.QUESTION.SETUP, () => {
      this.state = this._AppStates.WAITING_FOR_QUESTION_DEFINITION;
    });

    this._socketService.on(this._SocketEvents.QUESTION.START, () => {
      this.state = this._AppStates.WAITING_FOR_ALL_ANSWERS;
    });

    this._socketService.on(this._SocketEvents.GAME.TURN_OVER, () => {
      this.state = this._AppStates.WAITING_FOR_NEXT_TURN;
    });
  }
}
