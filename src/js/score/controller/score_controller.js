export default class ScoreController {
  /* @ngInject */
  constructor(scoreService, stateService, AppStates) {
    this._AppStates = AppStates;
    this._scoreService = scoreService;
    this._stateService = stateService;
  }

  get gameStarted() {
    return this._stateService.state !== this._AppStates.WAITING_FOR_GAME_TO_START;
  }

  get scores() {
    return this._scoreService.scores;
  }
}
