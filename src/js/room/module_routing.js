import angular from 'angular';

export default function () {
  angular.module('app.room').config(configure);

  /* @ngInject */
  function configure($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('index', {
        url: '/i',
        controller: 'LandingController',
        controllerAs: 'landing',
        templateUrl: '/templates/index'
      })
      .state('room', {
        url: '/r/:id',
        controller: 'RoomController',
        controllerAs: 'vm',
        templateUrl: '/templates/room/index',
        resolve: {
          /* @ngInject */
          room: ($stateParams, Rooms, roomService) => Rooms.get($stateParams.id).then(room => {
            roomService.room = room;
            return room;
          })
        },
        /* @ngInject */
        onEnter: onEnter,
        /* @ngInject */
        onExit: roomService => roomService.leaveRoom()
      });
    $urlRouterProvider.when('', '/i');
  }
}

function onEnter($stateParams, roomService, playerService, $modal, $q) {
  return ensureUsernameIsDefined(playerService, $modal, $q)
    .then(() => roomService.joinRoom({
      roomId: $stateParams.id,
      username: playerService.username
    }))
    .then(result => result.room);
}

function ensureUsernameIsDefined(playerService, $modal, $q) {
  if (!playerService.username) {
    let modalInstance = $modal.open({
      templateUrl: '/templates/player/username',
      controller: 'DefineUsernameController',
      controllerAs: 'vm',
      backdrop: 'static'
    });
    return modalInstance.result
      .then(username => {
        playerService.username = username;
      });
  }
  return $q.resolve();
}
