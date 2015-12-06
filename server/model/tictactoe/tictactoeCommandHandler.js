module.exports = function tictactoeCommandHandler(given) {
  return {
    executeCommand: function(command) {
      return [{
        cid: command.cid,
        event: "GameCreated",
        user: command.user,
        name: command.name,
        time: command.time
      }]
    }
  };
};
