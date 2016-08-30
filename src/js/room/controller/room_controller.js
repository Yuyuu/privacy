export default class RoomController {
  /* @ngInject */
  constructor(roomService, playerService) {
    this._playerService = playerService;
    this._roomService = roomService;
  }

  get room() {
    return this._roomService.room;
  }
}
