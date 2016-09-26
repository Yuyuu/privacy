import angular from 'angular';

export default function () {
  angular.module('app.error')
    .config(configure);

  /* @ngInject */
  function configure($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('404', {
        url: '/404',
        templateUrl: '/templates/error/404'
      })
      .state('error', {
        url: '/e',
        templateUrl: '/templates/error/default'
      });
    $urlRouterProvider.otherwise('/404');
  }
}
