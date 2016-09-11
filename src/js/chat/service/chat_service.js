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
  }
}
