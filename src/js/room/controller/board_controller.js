export default class BoardController {
  /* @ngInject */
  constructor(boardService, playerService, stateService, resultsService, AppStates) {
    this._AppStates = AppStates;
    this._boardService = boardService;
    this._playerService = playerService;
    this._resultsService = resultsService;
    this._stateService = stateService;
  }

  submitAnswer(answer, yesCountGuess) {
    this._boardService.submitAnswer({answer, yesCountGuess}).then(() => {
      this.answerRecap = answer === 'YES' ? 'OUI' : 'NON';
      this.answer = null;
      this.yesCountGuessRecap = yesCountGuess;
      this.yesCountGuess = null;
    });
  }

  define(question) {
    question && this._boardService.define(question).then(() => {
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

  get _currentPlayerHasAnswered() {
    return this._playerService.player && this.waitingPlayersIds.indexOf(this._playerService.player.id) !== -1;
  }

  get isGameStarted() {
    return this._stateService.state !== this._AppStates.WAITING_FOR_GAME_TO_START;
  }

  get isUserSelectedForNextQuestion() {
    return this.playerSelectedForNextQuestion && this._playerService.player &&
      this._playerService.player.id === this.playerSelectedForNextQuestion.id;
  }

  get loading() {
    return (this._stateService.state === this._AppStates.WAITING_FOR_PLAYER_SELECTION ||
      this._stateService.state === this._AppStates.WAITING_FOR_QUESTION_DEFINITION) &&
      !this.isUserSelectedForNextQuestion;
  }

  get loadingMessage() {
    if (this._stateService.state === this._AppStates.WAITING_FOR_PLAYER_SELECTION) {
      return 'Sélection du prochain joueur...';
    } else if (this.playerSelectedForNextQuestion &&
      this._stateService.state === this._AppStates.WAITING_FOR_QUESTION_DEFINITION) {
      return `C'est au tour de ${this.playerSelectedForNextQuestion.username} de poser une question.`;
    }
    return '';
  }

  get nextQuestion() {
    return this._boardService.question;
  }

  get playerSelectedForNextQuestion() {
    return this._boardService.playerSelectedForNextQuestion;
  }

  get results() {
    return this._resultsService.results;
  }

  get showAnswerForm() {
    return this._stateService.state === this._AppStates.WAITING_FOR_ALL_ANSWERS &&
      this._boardService.currentPlayerIsIncludedInQuestion && !this._currentPlayerHasAnswered;
  }

  get showNextTurn() {
    return this._stateService.state === this._AppStates.WAITING_FOR_NEXT_TURN;
  }

  get showPlayerRecap() {
    return this._stateService.state === this._AppStates.WAITING_FOR_NEXT_TURN ||
      this._stateService.state === this._AppStates.WAITING_FOR_ALL_ANSWERS &&
      this._boardService.currentPlayerIsIncludedInQuestion && this._currentPlayerHasAnswered;
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
