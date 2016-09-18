import angular from 'angular';

import LoadingSpinnerDirective from './directive/loading_spinner_directive';

let utilsModule = angular.module('app.utils', [])
  .directive('pvLoadingSpinner', LoadingSpinnerDirective);

export default utilsModule.name;
