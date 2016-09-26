export default class RestService {
  /* @ngInject */
  constructor($http, $q) {
    this._$http = $http;
    this._$q = $q;
  }

  delete(uri, configuration) {
    return this._extractData(this._$http.delete(uri, configuration || {}));
  }

  get(uri, configuration) {
    return this._extractData(this._$http.get(uri, configuration || {}));
  }

  patch(uri, data, configuration) {
    return this._extractData(this._$http.patch(uri, data, configuration || {}));
  }

  post(uri, data, configuration) {
    return this._extractData(this._$http.post(uri, data, configuration || {}));
  }

  put(uri, data, configuration) {
    return this._extractData(this._$http.put(uri, data, configuration || {}));
  }

  _extractData(httpPromise) {
    return httpPromise
      .then(response => response.data)
      .catch(error => this._$q.reject(error));
  }
}
