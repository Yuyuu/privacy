export default class DefineUsernameController {
  /* @ngInject */
  constructor($modalInstance, $state) {
    this._$modalInstance = $modalInstance;
    this._$state = $state;
  }

  cancel() {
    this._$modalInstance.dismiss();
    this._$state.go('index');
  }

  define(username) {
    this._$modalInstance.close(username);
  }
}
