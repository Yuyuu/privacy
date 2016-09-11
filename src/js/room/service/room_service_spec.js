import sinon from 'sinon';
import RoomService from './room_service';
import SocketEvents from '../../socket/events';

describe('The room service', () => {
  let socketService, chatService, service;

  beforeEach(() => {
    socketService = {on: sinon.spy()};
    chatService = {};
    service = new RoomService(socketService, SocketEvents, chatService);
  });

  it('should be defined', () => {
    service.should.be.defined;
  });
});
