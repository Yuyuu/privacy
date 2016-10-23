export default class PlayerService {
  constructor($state, socketService, SocketEvents) {
    this.player = null;
    this.joinedGame = false;
    this._SocketEvents = SocketEvents;
    this._socketService = socketService;
    this._$state = $state;

    this._setupEventListeners();
  }

  _setupEventListeners() {
    this._socketService.on(this._SocketEvents.GAME.STARTED, () => {
      if (!this.joinedGame) {
        this._$state.go('index');
      }
    });
  }
}
