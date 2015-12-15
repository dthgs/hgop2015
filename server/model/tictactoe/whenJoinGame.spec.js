'use strict';

const tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game cmd', () => {

	it('should join existing game', () => {
		const given = [{
			cmdID: '1234',
			event: 'GameCreated',
			gameId: 3,
			userName: 'Daniel',
			gameName: 'Test Game 3',
			timeStamp: '2015.12.10.T13:47:30'
		}];
		const when = {
			cmdID: '4567',
			command: 'JoinGame',
			gameId: 3,
			userName: 'Jon',
			gameName: 'Test Game 3',
			timeStamp: '2015.12.10.T13:48:10'
		}; 
		const then = [{
			cmdID: '4567',
			event: 'GameJoined',
			gameId: 3,
			userName: 'Jon',
			otherUserName: 'Daniel',
			gameName: 'Test Game 3',
			timeStamp: '2015.12.10.T13:48:10'
		}];
		
		const actualEvents = tictactoeCommandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

	it('should reject joining a non-existing game', () => {
		const given = [];
		const when = {
			cmdID: '4567',
			command: 'JoinGame',
			gameId: 999,
			userName: 'Jon',
			gameName: 'Test Game 999',
			timeStamp: '2015.12.10.T14:26:30'
		}; 
		const then = [{
			cmdID: '4567',
			event: 'GameDoesNotExist',
			gameId: 999,
			userName: 'Jon',
			timeStamp: '2015.12.10.T14:26:30'
		}];
		
		const actualEvents = tictactoeCommandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

});
