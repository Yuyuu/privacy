export default class CardController {
  /* @ngInject */
  constructor(cardService) {
    this._cardService = cardService;
  }

  pickRandomCard() {
    !this.card && this._cardService.getRandomCard();
  }

  get card() {
    return this._cardService.card;
  }
}
