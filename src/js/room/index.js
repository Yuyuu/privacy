import angular from 'angular';
import core from '../core';
import socket from '../socket';
import player from '../player';
import chat from '../chat';
import configureModuleRouting from './module_routing';

import RoomsResource from './resource/rooms_resource';
import RoomService from './service/room_service';
import LandingController from './controller/landing_controller';
import CreateRoomController from './controller/create_room_controller';
import RoomController from './controller/room_controller';

let roomModule = angular.module('app.room', [core, socket, player, chat])
  .service('Rooms', RoomsResource)
  .service('roomService', RoomService)
  .controller('LandingController', LandingController)
  .controller('CreateRoomController', CreateRoomController)
  .controller('RoomController', RoomController);

configureModuleRouting();

export default roomModule.name;
