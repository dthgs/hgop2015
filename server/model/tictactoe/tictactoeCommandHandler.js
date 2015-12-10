'use strict';

var _ = require('lodash');

module.exports = function tictactoeCommandHandler(events) {
	
	const handlers = {
		'CreateGame': function(cmd) {
			return [{
				cmdID: cmd.cmdID,
				event: 'GameCreated',
				userName: cmd.userName,
				gameName: cmd.gameName,
				timeStamp: cmd.timeStamp			
			}]
		}
	};

	return {
		executeCommand: function(cmd) {
			return handlers[cmd.command](cmd);
		}
	};

};
