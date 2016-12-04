export default class CardService {
  /* @ngInject */
  constructor(socketService, SocketEvents, Cards) {
    this.card = null;

    this._Cards = Cards;
    this._SocketEvents = SocketEvents;
    this._socketService = socketService;

    this._setupEventListeners();
  }

  getRandomCard() {
    return this._Cards.getRandom().then(card => {
      this.card = card;
      return card;
    });
  }

  _setupEventListeners() {
    this._socketService.on(this._SocketEvents.GAME.TURN_OVER, () => {
      this.card = null;
    });
  }
}
