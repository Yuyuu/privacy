import angular from 'angular';

import ScoreService from './service/score_service';
import ScoreController from './controller/score_controller';

let scoreModule = angular.module('app.room.score', [])
  .service('scoreService', ScoreService)
  .controller('ScoreController', ScoreController);

export default scoreModule.name;
