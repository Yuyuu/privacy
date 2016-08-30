import sinon from 'sinon';
import RoomService from './room_service';
import SocketEvents from '../../socket/events';

describe('The room service', () => {
  let socket, service;

  beforeEach(() => {
    socket = {on: sinon.spy()};
    service = new RoomService({}, socket, SocketEvents);
  });

  it('should be defined', () => {
    service.should.be.defined;
  });
});
