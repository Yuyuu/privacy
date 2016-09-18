import angular from 'angular';
import core from '../core';
import socket from '../socket';
import player from '../player';
import chat from '../chat';
import score from '../score';
import configureModuleRouting from './module_routing';

import RoomsResource from './resource/rooms_resource';
import RoomService from './service/room_service';
import BoardService from './service/board_service';
import LandingController from './controller/landing_controller';
import CreateRoomController from './controller/create_room_controller';
import RoomController from './controller/room_controller';
import BoardController from './controller/board_controller';
import RangeFilter from './filter/range_filter';

let roomModule = angular.module('app.room', [core, socket, player, chat, score])
  .service('Rooms', RoomsResource)
  .service('roomService', RoomService)
  .service('boardService', BoardService)
  .controller('LandingController', LandingController)
  .controller('CreateRoomController', CreateRoomController)
  .controller('RoomController', RoomController)
  .controller('BoardController', BoardController)
  .filter('pvRange', RangeFilter);

configureModuleRouting();

export default roomModule.name;
