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
    var command = {
	cmdID: '1234',
	command: 'CreateGame',
	gameId: 1,
	userName: 'Daniel',
	gameName: 'Test Game 1',
	timeStamp: '2015.12.10.T10:56:30'
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/1')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
		cmdID: '1234',
		event: 'GameCreated',
		gameId: 1,
		userName: 'Daniel',
		gameName: 'Test Game 1',
		timeStamp: '2015.12.10.T10:56:30'
              }]);
            done();
          });
      });
  });

   it('Should execute fluid API test', function (done) {
     given(user("Dannithor").createsGame("Fluid API test game"))
     .expect("GameCreated").isOk(done);
   });

   it('Should play a game until draw', function (done) {
    given(user("X").createsGame("123").named("Fluid API draw"))
      .and(user("O").joinsGame("123"))
      .and(user("X").makeMove(0,0))
      .and(user("O").makeMove(1,0))
      .and(user("X").makeMove(2,0))
      .and(user("O").makeMove(0,1))
      .and(user("X").makeMove(1,1))
      .and(user("O").makeMove(0,2))
      .and(user("X").makeMove(2,1))
      .and(user("O").makeMove(2,2))
      .and(user("X").makeMove(1,2))
      .expect("GameDrawn").byUser("X").isOk(done);
   });

});
