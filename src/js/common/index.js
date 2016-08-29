import angular from 'angular';
import core from '../core';
import socket from '../socket';

import OrchestratorController from './controller/orchestrator_controller';

let commonModule = angular.module('app.common', [core, socket])
  .controller('OrchestratorController', OrchestratorController);

export default commonModule.name;
