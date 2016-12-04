export default class CardsResource {
  /* @ngInject */
  constructor(restService) {
    this._restService = restService;
  }

  getRandom() {
    return this._restService.get('/api/cards');
  }
}
