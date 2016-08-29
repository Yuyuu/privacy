import angular from 'angular';
import 'angular-socket-io';

import SocketFactory from './service/socket_service';

let socketModule = angular.module('socket', ['btford.socket-io'])
  .factory('socket', SocketFactory);

export default socketModule.name;
