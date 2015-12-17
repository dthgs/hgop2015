'use strict';

const tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game cmd', () => {

	it('should create a game', () => {
		const given = [];
		const when = {
			cmdID: '1234',
			command: 'CreateGame',
			gameId: 1,
			userName: 'Daniel',
			gameName: 'Test Game 1',
			timeStamp: '2015.12.10.T10:56:30'
		}; 
		const then = [{
			cmdID: '1234',
			event: 'GameCreated',
			gameId: 1,
			userName: 'Daniel',
			gameName: 'Test Game 1',
			timeStamp: '2015.12.10.T10:56:30'
		}];
		
		const actualEvents = tictactoeCommandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

	it('should create another game with different user and time', () => {
		const given = [];
		const when = {
			cmdID: '2345',
			command: 'CreateGame',
			gameId: 2,
			userName: 'Thor',
			gameName: 'Test Game 2',
			timeStamp: '2015.12.10.T13:09:30'
		};
		const then = [{
			cmdID: '2345',
			event: 'GameCreated',
			gameId: 2,
			userName: 'Thor',
			gameName: 'Test Game 2',
			timeStamp: '2015.12.10.T13:09:30'
		}];

		const actualEvents = tictactoeCommandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

});
