'use strict';

const tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game cmd', () => {

	it('should create a game', () => {
		const given = [];
		const when = {
			cmdID: '1234',
			command: 'CreateGame',
			userName: 'Daniel',
			gameName: 'Test Game 1',
			timeStamp: '2015.12.10.T10:56:30'
		}; 
		const then = [{
			cmdID: '1234',
			event: 'GameCreated',
			userName: 'Daniel',
			timeStamp: '2015.12.10.T10:56:30'
		}];
		
		const actualEvents = tictactoeCommandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

});
