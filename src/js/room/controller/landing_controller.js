export default class LandingController {
  /* @ngInject */
  constructor($state, Rooms, playerService) {
    this._playerService = playerService;
    this._Rooms = Rooms;
    this._$state = $state;
  }

  createRoom(roomId, username) {
    return this._Rooms.create({name: roomId}).then(room => this.joinRoom(room.id, username));
  }

  joinRoom(roomId, username) {
    this._playerService.player = {username};
    this._$state.go('room', {'id': roomId});
  }
}
