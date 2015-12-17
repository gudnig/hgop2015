var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function postCommands(commands, done) {
  var command;
  var req = request(acceptanceUrl);
  if(commands.length > 0)
  {
    command = commands.shift();

    req
      .post(command.uri)
      .type('json')
      .send(command)
      .end(function (err) {
        if(err) { return done(err); }
      });
    postCommands(commands, done);

  }
}

function user(name) {
  var cidCount = 0;
  var command = {};
  var commandAPI = {
    createsGame: function(gameId) {
      cidCount++;
      command.cid = cidCount;
      command.command = "CreateGame";
      command.gameId = gameId;
      command.time = "2015.12.06T15:30:55";
      command.uri = "/api/createGame";
      return commandAPI
    },
    withName: function(gameName) {
      command.name = gameName;
      return commandAPI;
    },
    joinsGame: function(gameId) {
      cidCount++;
      command.cid = cidCount.toString();
      command.gameId = gameId;
      command.command = "JoinGame";
      command.time = "2015.12.06T15:30:55";
      command.uri = "/api/joinGame";

      return commandAPI;
    },
    places: function(row, column, symbol) {
      cidCount++;
      command.cid = cidCount.toString();
      command.command = "Place";
      command.user = name;
      command.symbol = symbol;
      command.row = row;
      command.column = column;
      command.time = "2015.12.12T15:15:15";
      command.uri = "/api/placeMove";
      return commandAPI;
    },
    action: function() {
      return command;
    }
  };
  command.user = name;
  return commandAPI;
}

function given(command) {

  // Usage: use commandAPI from user function as the command paramater to chain given
  // finish by calling expect and using the expectAPI to build an expected event
  // the final call should be isOk which checks the validity of the last event
  // against the expected event
  var commands = [];
  var expectedEvent = { };

  var currGameId;

  var givenAPI = {
    and: function(command) {
      if(command.gameId === undefined) {
        command.gameId = currGameId;
      }
      expectedEvent.cid = command.cid;
      expectedEvent.time = command.time;
      commands.push(command);

      return givenAPI;
    },
    expect: function(eventName) {

      var expectAPI = {
        withName: function(name) {
          expectedEvent.name = name;
          return expectAPI;
        },
        withId: function(gameId) {
          expectedEvent.gameId = gameId;
          return expectAPI;
        },
        byUser: function(name) {
          expectedEvent.user = name;
          return expectAPI;
        },
        hostedByUser: function(name) {
          expectedEvent.hostingUser = name;
          return expectAPI;
        },
        isOk: function(done) {
          postCommands(commands, done);
          request(acceptanceUrl)
            .get('/api/gameHistory/' + currGameId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              should(res.body.pop()).eql(expectedEvent);
              done();
            });
        }
      };
      expectedEvent.event = eventName;
      return expectAPI;
    }
  };
  expectedEvent.cid = command.cid;
  expectedEvent.time = command.time;
  currGameId = command.gameId;
  commands.push(command);

  return givenAPI;
}

module.exports.user = user;
module.exports.given = given;
