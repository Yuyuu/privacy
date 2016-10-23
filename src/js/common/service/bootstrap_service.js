export default class BootstrapService {
  /* @ngInject */
  constructor($rootScope, $state, $uibModalStack) {
    this._$rootScope = $rootScope;
    this._$state = $state;
    this._$uibModalStack = $uibModalStack;
  }

  start() {
    this._$rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      event.preventDefault();
      let errorState = error.status === 404 ? '404' : 'error';
      this._$state.go(errorState);
    });

    this._$rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState) => {
      if (toState !== fromState) {
        this._$uibModalStack.dismissAll();
      }
    });
  }
}
