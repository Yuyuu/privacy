export default class CreateRoomController {
  /* @ngInject */
  constructor($modalInstance) {
    this._$modalInstance = $modalInstance;
  }

  cancel() {
    this._$modalInstance.dismiss();
  }

  create(room, username) {
    this._$modalInstance.close({room, username});
  }
}
