import sinon from 'sinon';
import RoomController from './room_controller';

describe('The room controller', () => {
  let roomService, room, controller;

  beforeEach(() => {
    roomService = {joinRoom: sinon.stub()};
    roomService.joinRoom.resolves({room: {players: []}});
    controller = new RoomController(roomService, room);
  });

  it('should be defined', () => {
    controller.should.be.defined;
  });
});
