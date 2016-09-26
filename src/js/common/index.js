import angular from 'angular';
import core from '../core';
import socket from '../socket';

import AppStates from './states';
import BootstrapService from './service/bootstrap_service';
import StateService from './service/state_service';
import OrchestratorController from './controller/orchestrator_controller';

let commonModule = angular.module('app.common', [core, socket])
  .constant('AppStates', AppStates)
  .service('bootstrapService', BootstrapService)
  .service('stateService', StateService)
  .controller('OrchestratorController', OrchestratorController);

export default commonModule.name;
