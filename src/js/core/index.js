import angular from 'angular';
import angularUiRouter from 'angular-ui-router';
import 'angular-ui-bootstrap';

let coreModule = angular.module('app.core', [
  angularUiRouter,
  'ui.bootstrap',
  'ui.bootstrap.tpls'
]);

export default coreModule.name;
