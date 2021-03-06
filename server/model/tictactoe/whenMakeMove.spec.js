var tictactoeCommandHandler = require('./tictactoeCommandHandler');
describe('place command', function() {
  var given, when, then;

  beforeEach(function() {
    given = [{
      cid: "12",
      gameId: "3",
      event: "GameCreated",
      user: "gudni",
      name: "gudni's game",
      time: "2015.12.06T21:00:01"
    }, {
      cid: "144",
      gameId: "3",
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
      gameId: "3",
      command: "Place",
      user: "gudni",
      symbol: "X",
      row: 1,
      column: 1,
      time: "2015.12.06T21:03:50"
    };
    then = [{
      cid: "13",
      gameId: "3",
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
      gameId: "3",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 0,
      column: 2,
      time: "2015.12.06T21:05:50"
    });
    when = {
      cid: "147",
      gameId: "3",
      command: "Place",
      user: "gretar",
      symbol: "O",
      row: 1,
      column: 1,
      time: "2015.12.06T21:05:55"
    };

    then = [{
      cid: "147",
      gameId: "3",
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
      gameId: "3",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 1,
      column: 1,
      time: "2015.12.06T21:05:47"
    });
    when = {
      cid: "166",
      gameId: "3",
      command: "Place",
      user: "gretar",
      symbol: "O",
      row: 1,
      column: 1,
      time: "2015.12.06T21:06:55"
    };

    then = [{
      cid: "166",
      gameId: "3",
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
      gameId: "3",
      command: "Place",
      user: "gudni",
      symbol: "X",
      row: 0,
      column: 3,
      time: "2015.12.06T21:06:33"
    };
    then = [{
      cid: "22",
      gameId: "3",
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
      gameId: "3",
      command: "Place",
      user: "gudni",
      symbol: "X",
      row: -1,
      column: 2,
      time: "2015.12.06T21:06:47"
    };
    then = [{
      cid: "25",
      gameId: "3",
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

  it('should return win event on 3 in a row victory', function() {

    given.push({
      cid: "28",
      gameId: "3",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 0,
      column: 0,
      time: "2015.12.06T21:05:59"
    });
    given.push({
      cid: "29",
      gameId: "3",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 0,
      column: 1,
      time: "2015.12.06T21:06:07"
    });

    when = {
      cid: "30",
      gameId: "3",
      command: "Place",
      user: "gudni",
      symbol: "X",
      row: 0,
      column: 2,
      time: "2015.12.06T21:06:47"
    };

    then = [{
      cid: "30",
      gameId: "3",
      event: "Placed",
      user: "gudni",
      symbol: "X",
      row: 0,
      column: 2,
      time: "2015.12.06T21:06:47"
    }, {
      cid: "30",
      gameId: "3",
      event: "Victory",
      user: "gudni",
      symbol: "X",
      time: "2015.12.06T21:06:47"
    }];

    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));
  });

  it('should return win event on 3 in a column victory', function() {

    given.push({
      cid: "28",
      gameId: "3",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 1,
      column: 1,
      time: "2015.12.06T21:05:54"
    });
    given.push({
      cid: "29",
      gameId: "3",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 0,
      column: 1,
      time: "2015.12.06T21:06:14"
    });

    when = {
      cid: "30",
      gameId: "3",
      command: "Place",
      user: "gudni",
      symbol: "X",
      row: 2,
      column: 1,
      time: "2015.12.06T21:06:33"
    };

    then = [{
      cid: "30",
      gameId: "3",
      event: "Placed",
      user: "gudni",
      symbol: "X",
      row: 2,
      column: 1,
      time: "2015.12.06T21:06:33"
    }, {
      cid: "30",
      gameId: "3",
      event: "Victory",
      user: "gudni",
      symbol: "X",
      time: "2015.12.06T21:06:33"
    }];

    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));
  });

  it('should return win event on same symbol in a diagonal backward slash', function() {

    given.push({
      cid: "166",
      gameId: "3",
      event: "Placed",
      user:"gretar",
      symbol: "O",
      row: 1,
      column: 1,
      time: "2015.12.06T21:06:15"
    });
    given.push({
      cid: "167",
      gameId: "3",
      event: "Placed",
      user:"gretar",
      symbol: "O",
      row: 2,
      column: 2,
      time: "2015.12.06T21:06:22"
    });

    when = {
      cid: "168",
      gameId: "3",
      command: "Place",
      user: "gretar",
      symbol: "O",
      row: 0,
      column: 0,
      time: "2015.12.06T21:06:49"
    };

    then = [{
      cid: "168",
      gameId: "3",
      event: "Placed",
      user: "gretar",
      symbol: "O",
      row: 0,
      column: 0,
      time: "2015.12.06T21:06:49"
    }, {
      cid: "168",
      gameId: "3",
      event: "Victory",
      user: "gretar",
      symbol: "O",
      time: "2015.12.06T21:06:49"
    }];

    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));
  });

  it('should return win event on same symbol in a diagonal forward slash', function() {

    given.push({
      cid: "29",
      gameId: "3",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 1,
      column: 1,
      time: "2015.12.06T21:07:01"
    });
    given.push({
      cid: "30",
      gameId: "3",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 0,
      column: 2,
      time: "2015.12.06T21:07:38"
    });

    when = {
      cid: "31",
      gameId: "3",
      command: "Place",
      user: "gudni",
      symbol: "X",
      row: 2,
      column: 0,
      time: "2015.12.06T21:07:48"
    };

    then = [{
      cid: "31",
      gameId: "3",
      event: "Placed",
      user: "gudni",
      symbol: "X",
      row: 2,
      column: 0,
      time: "2015.12.06T21:07:48"
    }, {
      cid: "31",
      gameId: "3",
      event: "Victory",
      user: "gudni",
      symbol: "X",
      time: "2015.12.06T21:07:48"
    }];

    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));
  });

  it('should draw when the board is full and no victory has been achieved', function() {
    given = [{
      cid: "12",
      gameId: "3",
      event: "GameCreated",
      user: "gudni",
      name: "gudni's game",
      time: "2015.12.06T21:00:01"
    }, {
      cid: "144",
      gameId: "3",
      event: "GameJoined",
      user: "gretar",
      name: "gudni's game",
      hostingUser: "gudni",
      time:"2015.12.06T21:03:02"
    }, {
      cid: "13",
      gameId: "3",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 1,
      column: 1,
      time: "2015.12.06T21:03:17"
    }, {
      cid: "145",
      gameId: "3",
      event: "Placed",
      user:"gretar",
      symbol: "O",
      row: 2,
      column: 2,
      time: "2015.12.06T21:03:32"
    }, {
      cid: "14",
      gameId: "3",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 0,
      column: 0,
      time: "2015.12.06T21:03:47"
    }, {
      cid: "146",
      gameId: "3",
      event: "Placed",
      user:"gretar",
      symbol: "O",
      row: 2,
      column: 0,
      time: "2015.12.06T21:04:00"
    }, {
      cid: "15",
      gameId: "3",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 2,
      column: 1,
      time: "2015.12.06T21:04:15"
    }, {
      cid: "147",
      gameId: "3",
      event: "Placed",
      user:"gretar",
      symbol: "O",
      row: 0,
      column: 1,
      time: "2015.12.06T21:04:30"
    }, {
      cid: "16",
      gameId: "3",
      event: "Placed",
      user:"gudni",
      symbol: "X",
      row: 1,
      column: 2,
      time: "2015.12.06T21:04:45"
    }, {
      cid: "148",
      gameId: "3",
      event: "Placed",
      user:"gretar",
      symbol: "O",
      row: 1,
      column: 0,
      time: "2015.12.06T21:05:00"
    }];

    when = {
      cid: "17",
      gameId: "3",
      command: "Place",
      user: "gudni",
      symbol: "X",
      row: 0,
      column: 2,
      time: "2015.12.06T21:05:15"
    };

    then = [{
      cid: "17",
      gameId: "3",
      event: "Placed",
      user: "gudni",
      symbol: "X",
      row: 0,
      column: 2,
      time: "2015.12.06T21:05:15"
    }, {
      cid: "17",
      gameId: "3",
      event: "Draw",
      time: "2015.12.06T21:05:15"
    }];

    var result = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(result).should.be.exactly(JSON.stringify(then));
  });

});


