var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

it('Should play 10000 games in 6 seconds.', function (done) {
  var doneCount = 0;
  var gamesToPlay = 10000;
  // Load test tolerance = 5 sec * 1.2 =  6 sec
  var x = 6;

  this.timeout(x * 1000);

  var QED = function () {
    if (gamesToPlay === ++doneCount) {
      done();
    }
  };

  for (var gameId = 0; gameId < gamesToPlay; gameId++) {
    given(user("X").createsGame(gameId).named("Capacity test game " + gameId))
      .and(user("O").joinsGame(gameId))
      .and(user("X").makeMove(0,0))
      .and(user("O").makeMove(1,0))
      .and(user("X").makeMove(2,0))
      .and(user("O").makeMove(0,1))
      .and(user("X").makeMove(1,1))
      .and(user("O").makeMove(0,2))
      .and(user("X").makeMove(2,1))
      .and(user("O").makeMove(2,2))
      .and(user("X").makeMove(1,2))
      .expect("GameDrawn").byUser("X").isOk(QED);
	//console.log("Capacity test game " + gameId);
  }
});
