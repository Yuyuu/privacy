export default class LastTurnController {
  /* @ngInject */
  constructor(resultsService) {
    this._resultsService = resultsService;
  }

  get results() {
    return this._resultsService.lastTurnResults;
  }
}
