/* @ngInject */
export default function ValidationIconDirective() {
  return {
    restrict: 'A',
    link: link
  };

  function link(scope, element, attributes) {
    scope.$watch(attributes.pvValidationIcon, newValue => {
      if (newValue) {
        element.removeClass('wrong-answer');
        element.removeClass('fa-close');
        element.addClass('fa-check');
        element.addClass('correct-answer');
      } else {
        element.removeClass('correct-answer');
        element.removeClass('fa-check');
        element.addClass('fa-close');
        element.addClass('wrong-answer');
      }
    });
  }
}
