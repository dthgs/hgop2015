'use strict';

var _ = require('lodash');

module.exports = function tictactoeCommandHandler(events) {

	const gameState = {
		gameCreatedEvent: events[0],
		board:	[['','',''],['','',''],['','','']]
	};

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
			return[{
				cmdID: cmd.cmdID,
				event: 'MoveMade',
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
			return handlers[cmd.command](cmd);
		}
	};

};
