export default class BootstrapService {
  /* @ngInject */
  constructor($rootScope, $state) {
    this._$rootScope = $rootScope;
    this._$state = $state;
  }

  start() {
    this._$rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      event.preventDefault();
      let errorState = error.status === 404 ? '404' : 'error';
      this._$state.go(errorState);
    });
  }
}
