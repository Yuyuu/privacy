export default class RoomsResource {
  /* @ngInject */
  constructor(restService) {
    this._restService = restService;
  }

  create(room) {
    return this._restService.post('/rooms', room);
  }

  get(roomId) {
    return this._restService.get(`/rooms/${roomId}`);
  }
}
