import angular from 'angular';

import ScoreService from './service/score_service';
import ResultsService from './service/results_service';
import ScoreController from './controller/score_controller';
import LastTurnController from './controller/last_turn_controller';

let scoreModule = angular.module('app.room.score', [])
  .service('scoreService', ScoreService)
  .service('resultsService', ResultsService)
  .controller('LastTurnController', LastTurnController)
  .controller('ScoreController', ScoreController);

export default scoreModule.name;
