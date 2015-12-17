var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

describe('TEST ENV LOAD TEST', function () {

})

it('Should play 100 games in < 9 seconds.', function (done) {
  var doneCount = 0;
  var gamesToPlay = 100;
  var x = 9;

  this.timeout(x * 1000);

  var QED = function () {
    if (gamesToPlay === ++doneCount) {
      done();
    }
    else {
      console.log(doneCount + "   " + gamesToPlay);
    }
  };

  for (var gameId = 0; gameId < gamesToPlay; gameId++) {
    given(user('Gudni').createsGame(gameId).withName('myGame').action())
      .and(user('Garri').joinsGame(gameId).withName('myGame').action())
      .and(user('Gudni').places(1,1,'X').action())
      .and(user('Garri').places(0,0,'O').action())
      .and(user('Gudni').places(2,0,'X').action())
      .and(user('Garri').places(0,2,'O').action())
      .and(user('Gudni').places(0,1,'X').action())
      .and(user('Garri').places(2,1,'O').action())
      .and(user('Gudni').places(1,2,'X').action())
      .and(user('Garri').places(1,0,'O').action())
      .and(user('Gudni').places(2,2,'X').action())
      .expect('Draw').withId(gameId).isOk(QED);
  }
});
