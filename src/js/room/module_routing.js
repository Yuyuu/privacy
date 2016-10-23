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
          room: ($stateParams, Rooms, roomService, $q) => Rooms.get($stateParams.id)
            .then(room => {
              roomService.room = room;
              return room;
            })
            .catch(error => $q.reject(error))
        },
        /* @ngInject */
        onEnter: onEnter,
        /* @ngInject */
        onExit: (roomService, playerService) => roomService.leaveRoom().then(() => {
          playerService.joinedGame = false;
        })
      });
    $urlRouterProvider.when('', '/i');
  }
}

function onEnter($stateParams, roomService, playerService, $uibModal, $q) {
  return roomService.joinRoom($stateParams.id)
    .then(() => ensureUsernameIsDefined(playerService, $uibModal, $q))
    .then(username => roomService.joinGame(username))
    .then(result => {
      playerService.player = result.player;
      playerService.joinedGame = true;
      return roomService.room;
    });
}

function ensureUsernameIsDefined(playerService, $uibModal, $q) {
  if (!playerService.player) {
    let modalInstance = $uibModal.open({
      templateUrl: 'defineUsername.html',
      controller: 'DefineUsernameController',
      controllerAs: 'vm',
      backdrop: 'static'
    });
    return modalInstance.result;
  }
  return $q.resolve(playerService.player.username);
}
