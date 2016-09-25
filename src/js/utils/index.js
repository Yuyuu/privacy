import angular from 'angular';

import LoadingSpinnerDirective from './directive/loading_spinner_directive';
import ElementValidationDirective from './directive/element_validation_directive';

let utilsModule = angular.module('app.utils', [])
  .directive('pvLoadingSpinner', LoadingSpinnerDirective)
  .directive('pvElementValidation', ElementValidationDirective);

export default utilsModule.name;
