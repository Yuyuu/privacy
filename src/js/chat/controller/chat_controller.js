export default class ChatController {
  /* @ngInject */
  constructor(chatService) {
    this._chatService = chatService;
  }

  get messages() {
    return this._chatService.messages;
  }

  send(message) {
    message && this._chatService.send(message).then(() => {
      this.message = '';
    });
  }
}
