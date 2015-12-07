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
    console.log("Board: " + board);
    return {
      legalMove: function(row, column) {
        if(row < 0 || column < 0)
          return false;
        return board[row][column] === '';
      },
      checkVictory: function(symbol, row, col) {
        // Checks if given symbol has achieved victory

        // First add new move to the board
        board[row][col] = symbol;

        // Row check
        for( var i = 0; i < 3; i++) {
          if(board[row][i] !== symbol) {
            break;
          }
          else if(i === 2) {
            return true;
          }
        }
        return false;
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
          symbol: command.symbol
        })
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
