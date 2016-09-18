export default class BoardController {
  /* @ngInject */
  constructor(boardService, playerService, stateService, AppStates) {
    this._AppStates = AppStates;
    this._boardService = boardService;
    this._playerService = playerService;
    this._stateService = stateService;
  }

  answer(value, yesCountGuess) {
    this._boardService.answer({value, yesCountGuess}).then(() => {
      this.answerRecap = value;
      this.yesCountGuessRecap = yesCountGuess;
      this.yesCountGuess = null;
    });
  }

  define(question) {
    this._boardService.define(question).then(() => {
      this.question = '';
    });
  }

  hasAnswered(playerId) {
    return this.waitingPlayersIds.indexOf(playerId) !== -1;
  }

  startNextTurn() {
    this._boardService.startNextTurn();
  }

  startGame() {
    this._boardService.startGame();
  }

  get isGameStarted() {
    return this._stateService.state !== this._AppStates.WAITING_FOR_GAME_TO_START;
  }

  get isUserSelectedForNextQuestion() {
    return this.playerSelectedForNextQuestion &&
      this._playerService.player.id === this.playerSelectedForNextQuestion.id;
  }

  get loading() {
    return (this._stateService.state === this._AppStates.WAITING_FOR_PLAYER_SELECTION ||
      this._stateService.state === this._AppStates.WAITING_FOR_QUESTION_DEFINITION) &&
      !this.isUserSelectedForNextQuestion;
  }

  get nextQuestion() {
    return this._boardService.question;
  }

  get playerSelectedForNextQuestion() {
    return this._boardService.playerSelectedForNextQuestion;
  }

  get results() {
    return this._boardService.results;
  }

  get showAnswerForm() {
    return this._stateService.state === this._AppStates.WAITING_FOR_ALL_ANSWERS &&
      this.waitingPlayersIds.indexOf(this._playerService.player.id) === -1;
  }

  get showNextTurn() {
    return this._stateService.state === this._AppStates.WAITING_FOR_NEXT_TURN;
  }

  get showPlayerRecap() {
    return this._stateService.state === this._AppStates.WAITING_FOR_NEXT_TURN ||
      this._stateService.state === this._AppStates.WAITING_FOR_ALL_ANSWERS &&
      this.waitingPlayersIds.indexOf(this._playerService.player.id) !== -1;
  }

  get showQuestion() {
    return this._stateService.state === this._AppStates.WAITING_FOR_ALL_ANSWERS ||
      this._stateService.state === this._AppStates.WAITING_FOR_NEXT_TURN;
  }

  get showQuestionForm() {
    return this._stateService.state === this._AppStates.WAITING_FOR_QUESTION_DEFINITION &&
      this.isUserSelectedForNextQuestion;
  }

  get waitingPlayersIds() {
    return this._boardService.waitingPlayersIds;
  }
}
