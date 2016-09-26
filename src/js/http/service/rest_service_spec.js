import sinon from 'sinon';
import Promise from 'bluebird';
import RestService from './rest_service';

describe('The rest service', () => {
  let $http, service;

  beforeEach(() => {
    $http = {
      get: sinon.stub(),
      post: sinon.stub(),
      put: sinon.stub(),
      patch: sinon.stub(),
      delete: sinon.stub()
    };
  });

  beforeEach(() => {
    service = new RestService($http, Promise);
  });

  it('should be defined', () => {
    service.should.to.be.defined;
  });

  it('should get a resource', () => {
    $http.get
      .withArgs('/uri/to/resource', {the: 'config'})
      .resolves({data: [{hello: 'world'}, {foo: 'bar'}], config: {withLinkObject: false}});

    let getCall = service.get('/uri/to/resource', {the: 'config'});

    getCall.then(objects => {
      objects.should.deep.equal([{hello: 'world'}, {foo: 'bar'}]);
    });
  });

  it('should reject with data', () => {
    $http.get
      .withArgs('/uri/to/resource', {})
      .rejects({status: 404, data: [{message: 'argh'}]});

    let getCall = service.get('/uri/to/resource');

    getCall.should.be.rejected.then(rejection => {
      rejection.should.deep.equal({status: 404, data: [{message: 'argh'}]});
    });
  });

  it('should post to a resource', () => {
    $http.post
      .withArgs('/uri/to/resource', {the: 'data'})
      .resolves({data: [{hello: 'world'}, {hey: 'world'}]});

    let postCall = service.post('/uri/to/resource', {the: 'data'});

    postCall.then(objects => {
      objects.should.deep.equal([{hello: 'world'}, {hey: 'world'}]);
    });
  });

  it('should post to a resource', () => {
    $http.post
      .withArgs('/uri/to/resource', {the: 'data'})
      .resolves({data: [{hello: 'world'}, {hey: 'world'}]});

    let postCall = service.post('/uri/to/resource', {the: 'data'});

    postCall.then(objects => {
      objects.should.deep.equal([{hello: 'world'}, {hey: 'world'}]);
    });
  });

  it('should put a resource', () => {
    $http.put
      .withArgs('/uri/to/resource', {the: 'data'})
      .resolves({data: [{hello: 'world'}, {hey: 'world'}]});

    let putCall = service.put('/uri/to/resource', {the: 'data'});

    putCall.then(objects => {
      objects.should.deep.equal([{hello: 'world'}, {hey: 'world'}]);
    });
  });

  it('should patch a resource', () => {
    $http.patch
      .withArgs('/uri/to/resource', {the: 'data'})
      .resolves({data: [{hello: 'world'}, {hey: 'world'}]});

    let patchCall = service.patch('/uri/to/resource', {the: 'data'});

    patchCall.then(objects => {
      objects.should.deep.equal([{hello: 'world'}, {hey: 'world'}]);
    });
  });

  it('should patch a resource', () => {
    $http.delete
      .withArgs('/uri/to/resource', {the: 'data'})
      .resolves({data: [{hello: 'world'}, {hey: 'world'}]});

    let deleteCall = service.delete('/uri/to/resource', {the: 'data'});

    deleteCall.then(objects => {
      objects.should.deep.equal([{hello: 'world'}, {hey: 'world'}]);
    });
  });
});
