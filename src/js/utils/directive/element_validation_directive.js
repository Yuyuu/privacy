/* @ngInject */
export default function ElementValidationDirective() {
  return {
    restrict: 'A',
    link: link
  };

  function link(scope, element, attributes) {
    scope.$watch(
      `${attributes.pvElementValidation}.$invalid && ${attributes.pvElementValidation}.$dirty`,
      hasError => {
        if (hasError) {
          element.addClass('has-error');
        }
      }
    );

    scope.$watch(
      `${attributes.pvElementValidation}.$valid && ${attributes.pvElementValidation}.$dirty`,
      hasSuccess => {
        if (hasSuccess) {
          element.removeClass('has-error');
        }
      }
    );
  }
}
