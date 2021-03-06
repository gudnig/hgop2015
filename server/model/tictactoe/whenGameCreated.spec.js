var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function() {
  var given, when, then;

  it('should create game', function() {
    given = [];
    when = {
      cid: "123",
      gameId: "1",
      command: "CreateGame",
      user: "gudnig",
      name: "test game",
      time: "2015.12.06T15:30:55"
    };
    then =[{
      cid: "123",
      gameId: "1",
      event: "GameCreated",
      user: "gudnig",
      name: "test game",
      time: "2015.12.06T15:30:55"
    }];

    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));
  });

  it('should create another game', function() {
    given = [];
    when = {
      cid: "34",
      gameId: "2",
      command: "CreateGame",
      user: "hermanToothrot",
      name: "real game",
      time: "2015.12.06T15:45:12"
    };
    then =[{
      cid: "34",
      gameId: "2",
      event: "GameCreated",
      user: "hermanToothrot",
      name: "real game",
      time: "2015.12.06T15:45:12"
    }];

    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));
  });
});
