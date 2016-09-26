import angular from 'angular';
import configureModuleRouting from './module_routing';

import DefaultErrorInterceptorService from './service/default_error_interceptor_service';

let errorModule = angular.module('app.error', [])
  .service('defaultErrorInterceptorService', DefaultErrorInterceptorService);

/* @ngInject */
errorModule
  .config($httpProvider => $httpProvider.interceptors.push('defaultErrorInterceptorService'));

configureModuleRouting();

export default errorModule.name;
