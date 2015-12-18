'use strict';

angular.module('tictactoeApp')
  .factory('gameState', function () {
    return function () {

      var gameState = {
        created: false,
        board: [['', '', ''], ['', '', ''], ['', '', '']],
        nextTurn: 'X',
        gameDraw: false,
        winner: undefined,
        mutate: function (events) {
          var handlers = {
            'GameCreated': function (event, gameState) {
              gameState.created = true;
              gameState.name = event.name;
              gameState.gameId = event.gameId;
              gameState.creatingUser = event.user;
            },
            'GameJoined': function (event, gameState) {
              gameState.joiningUser = event.user;
            },
            'Placed': function (event, gameState) {
              var x = event.row, y = event.column;
              gameState.board[x][y] = event.symbol;
              gameState.nextTurn = event.symbol === 'X' ? 'O' : 'X';
            },
            'Victory': function (event, gameState) {
              gameState.nextTurn = 'GameOver';
              gameState.winner =  { userName: event.user, side: event.symbol };
            },
            'Draw': function (event, gameState) {
              gameState.nextTurn = 'GameOver';
              gameState.gameDraw = true;
            }
          };
          _.each(events, function (ev) {
            if(!ev) {
              return;
            }
            if(handlers[ev.event]){
              handlers[ev.event](ev, gameState);
            }
          });
        }
      };
      return gameState;
    };
  });
