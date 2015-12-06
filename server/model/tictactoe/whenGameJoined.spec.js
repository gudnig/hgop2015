var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game command', function() {
  var given, when, then;

  it('should join existing game', function() {
    given = [{
      cid: "55",
      event: "GameCreated",
      user: "gretar",
      name: "1v1TTTPWNAGE",
      time: "2015.12.06T19:30:20"
    }];
    when = {
      cid: "445",
      command: "JoinGame",
      user: "gudni",
      name: "1v1TTTPWNAGE",
      time: "2015.12.06.T19:35:31"
    };
    then = [{
      cid: "445",
      event: "GameJoined",
      user: "gudni",
      name: "1v1TTTPWNAGE",
      hostingUser: "gretar",
      time: "2015.12.06.T19:35:31"
    }]
    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));
  });
});
