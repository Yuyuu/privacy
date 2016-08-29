import angular from 'angular';
import core from '../core';

import RoomController from './controller/room_controller';

let roomModule = angular.module('app.room', [core])
  .controller('RoomController', RoomController);

export default roomModule.name;
