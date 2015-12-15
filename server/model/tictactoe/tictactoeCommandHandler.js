'use strict';

var _ = require('lodash');

module.exports = function tictactoeCommandHandler(events) {

<<<<<<< HEAD
//console.log('Console please ', events);

=======
>>>>>>> b73ecb2de6a2a7ecbaf57f3b7fdee7057f669b66
	var gameState = {
		gameCreatedEvent: events[0],
		board: [['','',''],['','',''],['','','']]
	};

	var eventHandlers = {
		'MoveMade': (event) => {
			gameState.board[event.x][event.y] = event.side;
		}
    	};

	_.each(events, (event) => {
		const eventHandler = eventHandlers[event.event];
		if (eventHandler) {
			eventHandler(event)
<<<<<<< HEAD
		} else {
		      //console.error("No handler for event", event);
=======
>>>>>>> b73ecb2de6a2a7ecbaf57f3b7fdee7057f669b66
		}
	});

	const handlers = {
		'CreateGame': function(cmd) {
			return [{
				cmdID: cmd.cmdID,
				event: 'GameCreated',
				gameId: cmd.gameId,
				userName: cmd.userName,
				gameName: cmd.gameName,
				timeStamp: cmd.timeStamp			
			}]
		},
		'JoinGame': function(cmd) {
			if(gameState.gameCreatedEvent === undefined) {
				return [{
					cmdID: cmd.cmdID,
					event: 'GameDoesNotExist',
					gameId: cmd.gameId,
					userName: cmd.userName,
					timeStamp: cmd.timeStamp
				}];
			}
			return [{
				cmdID: cmd.cmdID,
				event: 'GameJoined',
				gameId: cmd.gameId,
				userName: cmd.userName,
				otherUserName: gameState.gameCreatedEvent.userName,
				gameName: cmd.gameName,
				timeStamp: cmd.timeStamp
			}];
		},
		'MakeMove': function(cmd) {
			var move = 'MoveMade';

			if(gameState.board[cmd.x][cmd.y] !== ''){
				move = 'IllegalMove';
			}

<<<<<<< HEAD
			return[{
				cmdID: cmd.cmdID,
				event: move,
				gameId: cmd.gameId,
=======
			//gameState.board[cmd.x][cmd.y] = cmd.side;

			return[{
				cmdID: cmd.cmdID,
				event: move,
>>>>>>> b73ecb2de6a2a7ecbaf57f3b7fdee7057f669b66
				userName: cmd.userName,
				gameName: gameState.gameCreatedEvent.gameName,
				x: cmd.x,
				y: cmd.y,
				side: cmd.side,
				timeStamp: cmd.timeStamp
			}];
		}
	};

	return {
		executeCommand: function(cmd) {
			const handler = handlers[cmd.command];
			if(handler){
				return handler(cmd);
			}
			return 'Fail command';
		}
	};

};
