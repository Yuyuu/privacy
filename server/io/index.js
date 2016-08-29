'use strict';

let socketIo = require('socket.io');

module.exports = httpServer => {
  let io = socketIo(httpServer, {});
  io.on('connection', () => {
    console.log('New client connected');
  });
};
