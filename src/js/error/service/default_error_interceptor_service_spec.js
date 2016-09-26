import sinon from 'sinon';

import DefaultErrorInterceptorService from './default_error_interceptor_service';

describe('The default error interceptor', () => {
  let $q, $location, interceptor;

  beforeEach(() => {
    $q = {reject: sinon.spy()};
    $location = {path: sinon.spy()};
    interceptor = new DefaultErrorInterceptorService($q, $location);
  });

  it('should be defined', () => {
    interceptor.should.be.defined;
  });

  it('should redirect to the error page if a 500 error occurs', () => {
    let rejection = {status: 500};
    interceptor.responseError(rejection);

    $location.path.should.have.been.calledWith('/error');
    $q.reject.should.have.been.calledWith(rejection);
  });

  it('should not redirect to the error page when any other error occurs', () => {
    let rejection = {status: 503};
    interceptor.responseError(rejection);

    $location.path.should.not.have.been.calledWith('/error');

    rejection.status = 600;
    interceptor.responseError(rejection);

    $location.path.should.not.have.been.calledWith('/error');
    $q.reject.should.have.been.calledWith(rejection);
  });
});
