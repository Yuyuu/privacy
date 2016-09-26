/* @ngInject */
export default function DefaultErrorInterceptorService($q, $location) {
  return {
    responseError: rejection => {
      if (rejection.status === 500) {
        $location.path('/error');
      }
      return $q.reject(rejection);
    }
  };
}
