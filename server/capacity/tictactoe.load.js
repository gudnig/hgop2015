var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

describe('TEST ENV LOAD TEST', function () {

})

it('Should play 800 games in < 7 seconds.', function (done) {
  var doneCount = 0;
  var gamesToPlay = 800;
  var x = 7;

  this.timeout(x * 1000);

  var QED = function () {
    if (gamesToPlay === ++doneCount) {
      done();
    }
  };

  for (var gameId = 0; gameId < gamesToPlay; gameId++) {
    given(user('Gudni').createsGame('13').withName('myGame').action())
      .and(user('Garri').joinsGame('13').withName('myGame').action())
      .and(user('Gudni').places(1,1,'X').action())
      .and(user('Garri').places(0,0,'O').action())
      .and(user('Gudni').places(2,0,'X').action())
      .and(user('Garri').places(0,2,'O').action())
      .and(user('Gudni').places(0,1,'X').action())
      .and(user('Garri').places(2,1,'O').action())
      .and(user('Gudni').places(1,2,'X').action())
      .and(user('Garri').places(1,0,'O').action())
      .and(user('Gudni').places(2,2,'X').action())
      .expect('Draw').withId('13').isOk(QED);
  }
});
