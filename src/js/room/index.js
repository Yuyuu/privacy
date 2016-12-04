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
import RoomController from './controller/room_controller';
import BoardController from './controller/board_controller';
import ValidationIconDirective from './directive/validation_icon_directive';
import RangeFilter from './filter/range_filter';
import CardsResource from './resource/cards_resource';
import CardService from './service/card_service';
import CardController from './controller/card_controller';

let roomModule = angular.module('app.room', [core, socket, player, chat, score])
  .service('Rooms', RoomsResource)
  .service('Cards', CardsResource)
  .service('roomService', RoomService)
  .service('boardService', BoardService)
  .service('cardService', CardService)
  .controller('LandingController', LandingController)
  .controller('RoomController', RoomController)
  .controller('BoardController', BoardController)
  .controller('CardController', CardController)
  .directive('pvValidationIcon', ValidationIconDirective)
  .filter('pvRange', RangeFilter);

configureModuleRouting();

export default roomModule.name;
