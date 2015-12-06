module.exports = function tictactoeCommandHandler(events) {
  var gameCreatedEvent = events[0];

  return {
    executeCommand: function(command) {
      if(command.command === "CreateGame") {
        return [{
          cid: command.cid,
          event: "GameCreated",
          user: command.user,
          name: command.name,
          time: command.time
        }]
      }
      else if(command.command === "JoinGame") {
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
      }
    }
  };
};
