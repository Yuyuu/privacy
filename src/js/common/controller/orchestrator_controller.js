export default class OrchestratorController {
  /* @ngInject */
  constructor(socket, $state) {
    this._socket = socket;
    this._$state = $state;
  }

  get isIndex() {
    return this._$state.is('index');
  }
}
