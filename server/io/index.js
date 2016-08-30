'use strict';

let socketIo = require('socket.io');
let socketSession = require('socket.io-express-session');
let wrap = require('./socket_wrapper');
const EVENTS = require('./events');

module.exports = (httpServer, session) => {
  let io = socketIo(httpServer, {});
  io.use(socketSession(session));
  io.on(EVENTS.SOCKET.CONNECTION, socket => {
    wrap(socket);
  });
};
