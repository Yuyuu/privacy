let _ = require('lodash');

export default class RoomService {
  /* @ngInject */
  constructor(socketService, SocketEvents, chatService) {
    this.room = null;
    this._chatService = chatService;
    this._SocketEvents = SocketEvents;
    this._socketService = socketService;

    this._setUpEventListeners();
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
      this._chatService.clearMessages();
    });
  }

  _setUpEventListeners() {
    this._socketService.on(this._SocketEvents.ROOM.NEW_PLAYER, player => {
      this.room.players.push(player);
    });

    this._socketService.on(this._SocketEvents.ROOM.PLAYER_LEFT, formerPlayer => {
      _.remove(this.room.players, player => player.id === formerPlayer.id);
    });
  }
}
