'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var given = require('../fluid-api/tictactoeFluid').given;
var user = require('../fluid-api/tictactoeFluid').user;

describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    /*jshint -W030 */
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command =     {
      cid : '1234',
      gameId : '999',
      command: 'CreateGame',
      user: 'Gulli',
      name: 'TheFirstGame',
      time: '2014-12-02T11:29:29'
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/999')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                'cid': '1234',
                'gameId': '999',
                'event': 'GameCreated',
                'user': 'Gulli',
                'name': 'TheFirstGame',
                'time': '2014-12-02T11:29:29'
              }]);
            done();
          });
      });
  });


   it('Should play until draw', function (done) {
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
       .expect('Draw').withId('13').isOk(done);

   });

});
