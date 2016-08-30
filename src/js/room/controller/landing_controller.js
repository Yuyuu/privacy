export default class LandingController {
  /* @ngInject */
  constructor($state, Rooms, $modal, playerService) {
    this._$modal = $modal;
    this._playerService = playerService;
    this._Rooms = Rooms;
    this._$state = $state;

    this._createRoomModalConfiguration = {
      templateUrl: '/templates/room/create',
      controller: 'CreateRoomController',
      controllerAs: 'vm'
    };
  }

  createRoom() {
    let modalInstance = this._$modal.open(this._createRoomModalConfiguration);
    return modalInstance.result
      .then(configuration => {
        this.username = configuration.username;
        return this._Rooms.create(configuration.room);
      })
      .then(room => this.joinRoom(room.id));
  }

  joinRoom(roomId) {
    this._playerService.username = this.username;
    this._$state.go('room', {'id': roomId});
  }
}
