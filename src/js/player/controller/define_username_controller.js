export default class DefineUsernameController {
  /* @ngInject */
  constructor($uibModalInstance, $state) {
    this._$uibModalInstance = $uibModalInstance;
    this._$state = $state;
  }

  cancel() {
    this._$uibModalInstance.dismiss();
    this._$state.go('index');
  }

  define(username) {
    this._$uibModalInstance.close(username);
  }
}
