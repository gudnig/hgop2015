var tictactoeCommandHandler = require('./tictactoeCommandHandler');
describe('place command', function() {
  var given, when, then;

  beforeEach(function() {
    given = [{
      cid: "12",
      event: "GameCreated",
      user: "gudni",
      name: "gudni's game",
      time: "2015.12.06T21:00:01"
    }, {
      cid: "144",
      event: "GameJoined",
      user: "gretar",
      name: "gudni's game",
      hostingUser: "gudni",
      time:"2015.12.06T21:03:02"
    }];
  });

  it('should place symbol on empty board', function() {
    when = {
      cid: "13",
      command: "Place",
      user: "gudni",
      symbol: "X",
      row: 1,
      column: 1,
      time: "2015.12.06T21:03:50"
    };
    then = [{
      cid: "13",
      event: "Placed",
      user: "gudni",
      symbol: "X",
      row: 1,
      column: 1,
      time: "2015.12.06T21:03:50"
    }];

    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));
  });
});
