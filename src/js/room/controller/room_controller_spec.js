import sinon from 'sinon';
import RoomController from './room_controller';

describe('The room controller', () => {
  let roomService, playerService, controller;

  beforeEach(() => {
    roomService = {joinRoom: sinon.stub()};
    roomService.joinRoom.resolves({room: {players: []}});
    controller = new RoomController(roomService, playerService);
  });

  it('should be defined', () => {
    controller.should.be.defined;
  });
});
