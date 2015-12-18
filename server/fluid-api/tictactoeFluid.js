'use strict';

var should = require('should');
var _ = require('lodash');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function given(user){
  const expectations = {
    "gameId": user.cmd.gameId,
    "userName": user.cmd.userName,
    "event": undefined,
  };
  const userCmd = [user];
  const givenApi = {
    byUser: function (userName) {
      expectations.userName = userName;
      return givenApi;
    },
    expect: function(eventName){
      expectations.event = eventName;
      return givenApi;
    },
    and: function(user2) {
      if (user2.cmd.userName === user.cmd.userName) {
        user2.cmd.side = 'X';
      } else {
        user2.cmd.side = 'O';
      }
      user2.cmd.name = user.cmd.name;
      user2.cmd.gameId = user.cmd.gameId;
      user2.cmd.otherUserName = user.cmd.userName;
      userCmd.push(user2);
      return givenApi;
    },
    isOk: function(done) {
      post(userCmd, 0, done);
    }
  };

  return givenApi;
  function post(cmds, i, done) {
    if (i < cmds.length) {
      request(acceptanceUrl).post(cmds[i].cmd.route).type('json').send(cmds[i].cmd)
        .end(function (err, res) {
          if (err) return done(err);
          res.statusCode.should.be.eql(200);
          post(cmds, ++i, done);
        });
    }
    else {
      request(acceptanceUrl).get('/api/gameHistory/' + user.cmd.gameId).expect(200).expect('Content-Type', /json/).end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        should(res.body[res.body.length-1].gameId).eql(expectations.gameId);
        should(res.body[res.body.length-1].userName).eql(expectations.userName);
        should(res.body[res.body.length-1].event).eql(expectations.event);
        done();
      });
    }
  }
}

function user(userName) {
  const userApi = {
    cmd: {
      userName: userName,
      name: undefined
    },
    createsGame: function (gameId) {
      userApi.cmd.gameId = gameId;
      userApi.cmd.command = "CreateGame";
      userApi.cmd.route = '/api/createGame';
      userApi.cmd.side = 'X';
      return userApi;
    },
    named: function (gameName) {
      userApi.cmd.name = gameName;
      return userApi;
    },
    joinsGame: function(gameId) {
      userApi.cmd.gameId = gameId;
      userApi.cmd.command = "JoinGame";
      userApi.cmd.route = '/api/joinGame';
      userApi.cmd.side = 'O';
      return userApi;
    },
    makeMove: function(x, y) {
      userApi.cmd.x = x;
      userApi.cmd.y = y;
      userApi.cmd.command = "MakeMove";
      userApi.cmd.route = '/api/makeMove';
      return userApi;
    }
  };

  return userApi;
}

module.exports.user = user;
module.exports.given = given;
