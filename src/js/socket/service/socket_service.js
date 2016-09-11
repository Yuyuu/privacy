export default class SocketService {
  /* @ngInject */
  constructor($q, socket) {
    this._socket = socket;
    this._$q = $q;
  }

  on(event, callback) {
    this._socket.on(event, callback);
  }

  promisifyEmit(event, data) {
    let deferred = this._$q.defer();
    this._socket.emit(event, data, result => {
      let terminatePromise = result.success ? deferred.resolve : deferred.reject;
      terminatePromise(result);
    });
    return deferred.promise;
  }
}
