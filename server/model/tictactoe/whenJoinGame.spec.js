'use strict';

const tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game cmd', () => {

	it('should join existing game', () => {
		const given = [{
			cmdID: '1234',
			event: 'GameCreated',
			userName: 'Daniel',
			gameName: 'Test Game 3',
			timeStamp: '2015.12.10.T13:47:30'
		}];
		const when = {
			cmdID: '4567',
			command: 'JoinGame',
			userName: 'Jon',
			gameName: 'Test Game 3',
			timeStamp: '2015.12.10.T13:48:10'
		}; 
		const then = [{
			cmdID: '4567',
			event: 'GameJoined',
			userName: 'Jon',
			otherUserName: 'Daniel',
			gameName: 'Test Game 3',
			timeStamp: '2015.12.10.T13:48:10'
		}];
		
		const actualEvents = tictactoeCommandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

});
