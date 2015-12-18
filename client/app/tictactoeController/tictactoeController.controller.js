'use strict';

angular.module('tictactoeApp')
  .controller('TictactoeController', function ($scope, $http, gameState, guid, $location, $interval) {

    $scope.gameState = gameState();

    var cid = 0;

    var thenHandleEvents = function (postPromise) {
      postPromise.then(function (data) {
        $scope.gameState.mutate(data.data);
      });

      postPromise.then(function(){

        if (mySide() === 'X'){
          $scope.me = $scope.gameState.creatingUser;
          $scope.myside = 'X';
          $scope.otherside = 'O';
          $scope.other = $scope.gameState.joiningUser;
        } else {
          $scope.other = $scope.gameState.creatingUser;
          $scope.me = $scope.gameState.joiningUser;
          $scope.myside = 'O';
          $scope.otherside = 'X';
        }

        $scope.joinUrl = 'http://' + $location.host() +( $location.port() ? ':' + $location.port() :'') + '/join/' + $scope.gameState.gameId;

      });
    };



    var gameId = $location.search().gameId;

    function refresh() {
      thenHandleEvents($http.get('/api/gameHistory/' + gameId));
    }

    refresh();
    $interval(refresh, 2000);

    $scope.mySide = function() {
      return $location.search().gameSide;
    };

    function mySide() {
      return $location.search().gameSide;
    }

    $scope.myTurn = function () {
      return mySide() === $scope.gameState.nextTurn;
    };
    $scope.placeMove = function (coords) {
      console.log('X: ' + coords.x + ' Y: ' + coords.y);
      console.log(coords[0]);
      if(!$scope.myTurn()){
        return;
      }
      var event = {
        cid: (++cid).toString(),
        gameId: $scope.gameState.gameId,
        command: 'Place',
        user: $scope.me,
        symbol: $scope.myside,
        row: coords[0],
        column: coords[1],
        time: '2014-12-02T11:29:29'
      };
      thenHandleEvents($http.post('/api/placeMove/', event
      ));
      console.log($scope.gameState.board);
      console.log(event)
    };
  });
