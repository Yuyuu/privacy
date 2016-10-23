export default class RoomController {
  /* @ngInject */
  constructor($scope, roomService, playerService) {
    this._playerService = playerService;
    this._roomService = roomService;

    $scope.$on('$destroy', () => {
      this._roomService.leaveRoom();
    });
  }

  isCurrentPlayer(player) {
    return this._playerService.player.id === player.id;
  }

  designateDealer(player) {
    return this._roomService.designateDealer(player);
  }

  get currentUserIsDealer() {
    if (this._roomService.room.dealer && this._playerService.player) {
      return this._roomService.room.dealer.id === this._playerService.player.id;
    }
    return false;
  }

  get room() {
    return this._roomService.room;
  }
}
