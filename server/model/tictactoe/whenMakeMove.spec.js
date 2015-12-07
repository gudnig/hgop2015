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
  it('should place symbol on empty slot on non-empty board', function() {
    given.push({
      cid: "15",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 0,
      column: 2,
      time: "2015.12.06T21:05:50"
    });
    when = {
      cid: "147",
      command: "Place",
      user: "gretar",
      symbol: "O",
      row: 1,
      column: 1,
      time: "2015.12.06T21:05:55"
    };

    then = [{
      cid: "147",
      event: "Placed",
      user: "gretar",
      symbol: "O",
      row: 1,
      column: 1,
      time: "2015.12.06T21:05:55"
    }];

    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));

  });

  it('should reject placement on occupied square', function() {
    given.push({
      cid: "19",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 1,
      column: 1,
      time: "2015.12.06T21:05:47"
    });
    when = {
      cid: "166",
      command: "Place",
      user: "gretar",
      symbol: "O",
      row: 1,
      column: 1,
      time: "2015.12.06T21:06:55"
    };

    then = [{
      cid: "166",
      event: "IllegalMove",
      user: "gretar",
      symbol: "O",
      row: 1,
      column: 1,
      time: "2015.12.06T21:06:55"
    }];

    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));

  });

  it('should reject placement out of bounds', function() {
    when = {
      cid: "22",
      command: "Place",
      user: "gudni",
      symbol: "X",
      row: 0,
      column: 3,
      time: "2015.12.06T21:06:33"
    };
    then = [{
      cid: "22",
      event: "IllegalMove",
      user: "gudni",
      symbol: "X",
      row: 0,
      column: 3,
      time: "2015.12.06T21:06:33"
    }];

    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));
  });

  it('should reject placement out of bounds with negative number', function() {
    when = {
      cid: "25",
      command: "Place",
      user: "gudni",
      symbol: "X",
      row: -1,
      column: 2,
      time: "2015.12.06T21:06:47"
    };
    then = [{
      cid: "25",
      event: "IllegalMove",
      user: "gudni",
      symbol: "X",
      row: -1,
      column: 2,
      time: "2015.12.06T21:06:47"
    }];
    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));
  });
});
