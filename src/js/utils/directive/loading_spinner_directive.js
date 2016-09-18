export default function LoadingSpinnerDirective() {
  return {
    restrict: 'E',
    template: '<div class="spinner">' +
    '<div class="first-bouncer"></div>' +
    '<div class="second-bouncer"></div>' +
    '<div class="third-bouncer"></div>' +
    '</div>'
  };
}
