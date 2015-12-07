module.exports = function tictactoeCommandHandler(events) {
  var gameCreatedEvent = events[0];
  var TictactoeState = require('./TictactoeState');
  var gameState = new TictactoeState(events);

  var handler = {
    "CreateGame": function(command) {
      return [{
        cid: command.cid,
        event: "GameCreated",
        user: command.user,
        name: command.name,
        time: command.time
      }]
    },
    "JoinGame": function(command) {
      if(gameCreatedEvent === undefined) {
        return [{
          cid: command.cid,
          event: "NoSuchGame",
          user: command.user,
          name: command.name,
          time: command.time
        }]
      }
      return [{
        cid: command.cid,
        event: "GameJoined",
        user: command.user,
        name: command.name,
        hostingUser: gameCreatedEvent.user,
        time: command.time
      }]
    },
    "Place": function(command) {
      var commandEvent = "Placed";
      var legalMove = gameState.legalMove(command.row, command.column);
      if(!legalMove) {
        commandEvent = "IllegalMove";
      }

      var result =  [{
        cid: command.cid,
        event: commandEvent,
        user: command.user,
        symbol: command.symbol,
        row: command.row,
        column: command.column,
        time: command.time
      }];

      if(legalMove && gameState.checkVictory(command.symbol, command.row, command.column)) {
        result.push({
          cid: command.cid,
          event: "Victory",
          user: command.user,
          symbol: command.symbol,
          time: command.time
        });
      }
      else if(gameState.boardFull()) {
        result.push({
          cid: command.cid,
          event: "Draw",
          time: command.time
        });
      }

      return result;
    }

  };

  return {
    executeCommand: function(command) {
      return handler[command.command](command);
    }
  };
};
