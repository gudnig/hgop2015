'use strict';

describe('Controller: CreateGameCtrl', function () {

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  var CreateGameCtrl, scope, httpBackend, location;

  beforeEach(function () {
    module(function ($provide) {
      var guids=['98765', '12345'];

      $provide.value('guid', function () {
        return guids.pop();
      });
    });

  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location) {
    httpBackend = $httpBackend;
    location = $location;
    scope = $rootScope.$new();
    CreateGameCtrl = $controller('CreateGameCtrl', {
      $scope: scope
    });
  }));


  it('should post variables from scope for guid, name and userName and process resulting events, and assign me to X', function () {
    httpBackend.expectPOST('/api/createGame/', {
      cid: '12345',
      gameId: '98765',
      command: 'CreateGame',
      user: 'Gummi',
      name: 'TheSecondGame',
      time: '2014-12-02T11:29:29'
    }).respond([
        {
          cid: '12345',
          gameId: '98765',
          event: 'GameCreated',
          user: 'Gummi',
          name: 'TheSecondGame',
          time: '2014-12-02T11:29:29'
        }
      ]
    );

    scope.name = 'TheSecondGame';

    scope.user = 'Gummi';

    scope.createGame();
    httpBackend.flush();

    expect(location.search().gameId).toBe('98765');
    expect(location.search().gameSide).toBe('X');
    expect(location.path()).toBe('/tictactoe');

  });
});
