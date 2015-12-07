module.exports = function TictactoeState(events) {
  var board = [['', '', ''], ['', '', ''], ['', '', ''] ];
  var i;

  // Build board state from events
  events.forEach(function(entry) {
    if(entry.event === "Placed") {
      board[entry.row][entry.column] = entry.symbol;
    }
  });
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
      for(i = 0; i < 3; i++) {
        if(board[row][i] !== symbol)
          break;
        else if(i === 2)
          return true;
      }
      // Column check
      for(i = 0; i < 3; i++) {
        if(board[i][col] !== symbol)
          break;
        else if(i === 2)
          return true;
      }

      // backward slash (diagonal) check
      for(i = 0; i < 3; i++) {
        if(board[i][i] !== symbol)
          break;
        else if(i === 2)
          return true;
      }

      for(i = 0; i < 3; i++) {
        if(board[i][2 - i] !== symbol)
          break;
        else if(i === 2)
          return true;
      }

      return false;
    }
  };
};
