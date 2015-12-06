describe('create game command', function() {
  var given, when, then;

  it('should create game', function() {
    given = [];
    when = {
      cid: "123",
      command: "GreateGame",
      user: "gudnig",
      name: "test game",
      time: "2015.12.06T15:30:55"
    };
    then =[{
      id: "123",
      event: "GameCreated",
      user: "gudnig",
      name: "test game",
      time: "2015.12.06T15:30:55"
    }];
    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));
  });
});
