'use strict';

let socketIo = require('socket.io');
let socketSession = require('socket.io-express-session');
let SocketWrapper = require('./socket_wrapper');
const EVENTS = require('./events');

module.exports = (httpServer, session) => {
  let io = socketIo(httpServer, {});
  let socketWrapper = new SocketWrapper(io);
  io.use(socketSession(session));
  io.on(EVENTS.SOCKET.CONNECTION, socket => {
    socketWrapper.wrap(socket);
  });
};
