let _ = require('lodash');

export default class RoomService {
  /* @ngInject */
  constructor(socketService, SocketEvents, chatService, stateService, boardService, scoreService) {
    this.room = null;
    this._boardService = boardService;
    this._chatService = chatService;
    this._scoreService = scoreService;
    this._SocketEvents = SocketEvents;
    this._socketService = socketService;
    this._stateService = stateService;

    this._setupEventListeners();
  }

  joinRoom(configuration) {
    return this._socketService.promisifyEmit(this._SocketEvents.ROOM.JOIN, configuration)
      .then(result => {
        this.room.players.push(result.player);
        return result;
      });
  }

  leaveRoom() {
    return this._socketService.promisifyEmit(this._SocketEvents.ROOM.LEAVE).then(() => {
      this.room = null;
      this._scoreService.reset();
      this._boardService.reset();
      this._chatService.clearMessages();
      this._stateService.reset();
    });
  }

  _setupEventListeners() {
    this._socketService.on(this._SocketEvents.ROOM.NEW_PLAYER, player => {
      this.room.players.push(player);
    });

    this._socketService.on(this._SocketEvents.ROOM.PLAYER_LEFT, formerPlayer => {
      _.remove(this.room.players, player => player.id === formerPlayer.id);
    });

    this._socketService.on(this._SocketEvents.GAME.STARTED, () => {
      this.room.started = true;
      this._stateService.gameStarted();
    });
  }
}
