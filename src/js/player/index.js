import angular from 'angular';

import PlayerService from './service/player_service';
import DefineUsernameController from './controller/define_username_controller';

let playerModule = angular.module('app.player', [])
  .service('playerService', PlayerService)
  .controller('DefineUsernameController', DefineUsernameController);

export default playerModule.name;
