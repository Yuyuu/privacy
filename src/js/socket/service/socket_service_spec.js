let sinon = require('sinon');

import SocketFactory from './socket_service';

describe('The socket factory', () => {
  let socketFactory, factory;

  beforeEach(() => {
    socketFactory = sinon.spy();
    factory = new SocketFactory(socketFactory);
  });

  it('should be defined', () => {
    factory.should.be.defined;
  });

  it('should create a socket', () => {
    socketFactory.should.have.been.called;
  });
});
