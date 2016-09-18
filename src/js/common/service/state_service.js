export default class StateService {
  /* @ngInject */
  constructor(AppStates) {
    this.state = AppStates.WAITING_FOR_GAME_TO_START;

    this._AppStates = AppStates;
  }

  reset() {
    this.state = this._AppStates.WAITING_FOR_GAME_TO_START;
  }

  gameStarted() {
    this.state = this._AppStates.WAITING_FOR_PLAYER_SELECTION;
  }

  playerDefined() {
    this.state = this._AppStates.WAITING_FOR_QUESTION_DEFINITION;
  }

  questionDefined() {
    this.state = this._AppStates.WAITING_FOR_ALL_ANSWERS;
  }

  turnOver() {
    this.state = this._AppStates.WAITING_FOR_NEXT_TURN;
  }

  nextTurn() {
    this.state = this._AppStates.WAITING_FOR_PLAYER_SELECTION;
  }
}
