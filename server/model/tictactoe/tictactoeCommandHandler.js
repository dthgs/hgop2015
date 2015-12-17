'use strict';

var _ = require('lodash');

module.exports = function tictactoeCommandHandler(events) {

	var gameState = {
		gameCreatedEvent: events[0],
		board: [['','',''],['','',''],['','','']]
	};

	const verticalWin = (cmd) => {
		//console.log(cmd);
		//console.log(events);
		
		return gameState.board[cmd.x][0] === cmd.side &&
			gameState.board[cmd.x][1] === cmd.side &&
			gameState.board[cmd.x][2] === cmd.side;
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
		}
	});

	const handlers = {
		'CreateGame': function(cmd) {
			return [{
				cmdID: cmd.cmdID,
				event: 'GameCreated',
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
					userName: cmd.userName,
					timeStamp: cmd.timeStamp
				}];
			}
			return [{
				cmdID: cmd.cmdID,
				event: 'GameJoined',
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

			const ret = [{
				cmdID: cmd.cmdID,
				event: move,
				userName: cmd.userName,
				gameName: gameState.gameCreatedEvent.gameName,
				x: cmd.x,
				y: cmd.y,
				side: cmd.side,
				timeStamp: cmd.timeStamp
			}];

			gameState.board[cmd.x][cmd.y] = cmd.side;

			if(verticalWin(cmd)){
				ret.push({
				cmdID: '1111',
				event: 'GameWon',
				userName: cmd.userName,
				gameName: gameState.gameCreatedEvent.gameName,
				side: cmd.side,
				timeStamp: cmd.timeStamp
				});		
			}

			return ret;
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
