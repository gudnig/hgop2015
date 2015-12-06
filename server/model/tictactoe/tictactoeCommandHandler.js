module.exports = function tictactoeCommandHandler(events) {
  var gameCreatedEvent = events[0];

  function TictactoeState(events) {
    var board = [['', '', ''], ['', '', ''], ['', '', ''] ];

    // Build board state from events
    events.forEach(function(entry) {
      if(entry.event === "Placed") {
        board[entry.row][entry.column] = entry.symbol;
      }
    });

    return {
      legalMove: function(row, column) {
        return board[row][column] === '';

      }
    };
  }

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
      if(!gameState.legalMove(command.row, command.column)) {
        commandEvent = "IllegalMove";
        return [{
          cid: command.cid,
          event: commandEvent,
          user: command.user,
          symbol: command.symbol,
          row: command.row,
          column: command.column,
          time: command.time
        }];
      }

      return [{
        cid: command.cid,
        event: "Placed",
        user: command.user,
        symbol: command.symbol,
        row: command.row,
        column: command.column,
        time: command.time
      }]
    }
  };

  return {
    executeCommand: function(command) {
      return handler[command.command](command);
    }
  };
};
