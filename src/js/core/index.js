import angular from 'angular';
import angularUiRouter from 'angular-ui-router';
import 'angular-bootstrap';

let coreModule = angular.module('app.core', [
  angularUiRouter,
  'ui.bootstrap'
]);

export default coreModule.name;
