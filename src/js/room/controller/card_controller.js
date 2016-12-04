export default class CardController {
  /* @ngInject */
  constructor(cardService) {
    this._cardService = cardService;
  }

  pickRandomCard() {
    if (!this.card) {
      this.loading = true;
      this._cardService.getRandomCard().finally(() => {
        this.loading = false;
      });
    }
  }

  get card() {
    return this._cardService.card;
  }
}
