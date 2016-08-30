import angular from 'angular';

import RestService from './service/rest_service';

let httpModule = angular.module('app.http', [])
  .service('restService', RestService);

export default httpModule.name;
