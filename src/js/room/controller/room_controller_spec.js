import sinon from 'sinon';
import RoomController from './room_controller';

describe('The room controller', () => {
  let $scope, roomService, playerService, controller;

  beforeEach(() => {
    $scope = {$on: sinon.spy()};
    roomService = {joinRoom: sinon.stub()};
    roomService.joinRoom.resolves({room: {players: []}});
    controller = new RoomController($scope, roomService, playerService);
  });

  it('should be defined', () => {
    controller.should.be.defined;
  });
});
