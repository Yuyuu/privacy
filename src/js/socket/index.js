import angular from 'angular';
import SocketEvents from './events';
import 'angular-socket-io';

import SocketFactory from './service/socket_factory';
import SocketService from './service/socket_service';

let socketModule = angular.module('socket', ['btford.socket-io'])
  .constant('SocketEvents', SocketEvents)
  .factory('socket', SocketFactory)
  .service('socketService', SocketService);

export default socketModule.name;
