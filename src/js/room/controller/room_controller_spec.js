import RoomController from './room_controller';

describe('The room controller', () => {
  let controller;

  beforeEach(() => {
    controller = new RoomController();
  });

  it('should have a default room name', () => {
    controller.roomName.should.equal('The name of the room');
  });
});
