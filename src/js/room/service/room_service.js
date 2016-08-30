let _ = require('lodash');

export default class RoomService {
  /* @ngInject */
  constructor($q, socket, SocketEvents) {
    this.room = null;
    this._socket = socket;
    this._SocketEvents = SocketEvents;
    this._$q = $q;

    this._setUpSocketListeners();
  }

  joinRoom(configuration) {
    return this._encapsulate(this._SocketEvents.ROOM.JOIN, configuration)
      .then(result => {
        this.room.players.push(result.player);
        return result;
      });
  }

  leaveRoom() {
    return this._encapsulate(this._SocketEvents.ROOM.LEAVE).then(() => {
      this.room = null;
    });
  }

  _encapsulate(event, data) {
    let deferred = this._$q.defer();
    this._socket.emit(event, data, result => {
      let promiseTerminationFunction = result.success ? deferred.resolve : deferred.reject;
      promiseTerminationFunction(result);
    });
    return deferred.promise;
  }

  _setUpSocketListeners() {
    this._socket.on(this._SocketEvents.ROOM.NEW_PLAYER, player => {
      this.room.players.push(player);
    });

    this._socket.on(this._SocketEvents.ROOM.PLAYER_LEFT, formerPlayer => {
      _.remove(this.room.players, player => player.id === formerPlayer.id);
    });
  }
}
