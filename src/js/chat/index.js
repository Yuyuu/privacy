import angular from 'angular';
import 'angularjs-scroll-glue';

import ChatService from './service/chat_service';
import ChatController from './controller/chat_controller';

let chatModule = angular.module('app.room.chat', ['luegg.directives'])
  .service('chatService', ChatService)
  .controller('ChatController', ChatController);

export default chatModule.name;
