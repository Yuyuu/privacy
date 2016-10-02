export default class RoomController {
  /* @ngInject */
  constructor($scope, roomService, playerService) {
    this._playerService = playerService;
    this._roomService = roomService;

    $scope.$on('$destroy', () => {
      this._roomService.leaveRoom();
    });
  }

  get room() {
    return this._roomService.room;
  }
}
