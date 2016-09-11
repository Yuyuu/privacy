export default class ChatService {
  /* @ngInject */
  constructor(socketService, SocketEvents) {
    this.messages = [];

    this._SocketEvents = SocketEvents;
    this._socketService = socketService;

    this._setUpEventListeners();
  }

  clearMessages() {
    this.messages = [];
  }

  send(message) {
    return this._socketService.promisifyEmit(this._SocketEvents.CHAT.NEW_MESSAGE, message)
      .then(result => this.messages.push(result.messageData));
  }

  _setUpEventListeners() {
    this._socketService.on(this._SocketEvents.CHAT.NEW_MESSAGE, messageData => {
      this.messages.push(messageData);
    });

    this._socketService.on(this._SocketEvents.ROOM.NEW_PLAYER, player => {
      this.messages.push({content: `${player.username} has joined the room.`});
    });

    this._socketService.on(this._SocketEvents.ROOM.PLAYER_LEFT, player => {
      this.messages.push({content: `${player.username} has left the room.`});
    });
  }
}
