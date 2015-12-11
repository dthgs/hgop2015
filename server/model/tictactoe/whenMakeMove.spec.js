'use strict';

const tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('make move cmd', () => {
	
	var given, when, then;

	beforeEach(function() {
		given = [{
			cmdID: '1234',
			event: 'GameCreated',
			userName: 'Daniel',
			gameName: 'Test Game 123',
			timeStamp: '2015.13.10.T08:12:30'
		},{
			cmdID: '4567',
			event: 'GameJoined',
			userName: 'Jon',
			otherUserName: 'Daniel',
			gameName: 'Test Game 123',
			timeStamp: '2015.13.10.T08:13:45'
		}];
	});

	describe('on new game', () => {
		it('should make a move', () => {
			when = {
				cmdID: '1010',
				command: 'MakeMove',
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 1,
				y: 1,
				side: 'X',
				timeStamp: '2015.12.10.T08:25:10'
			}; 
			then = [{
				cmdID: '1010',
				event: 'MoveMade',
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 1,
				y: 1,
				side: 'X',
				timeStamp: '2015.12.10.T08:25:10'
			}];
		
			const actualEvents = tictactoeCommandHandler(given).executeCommand(when);
			JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
		});
	});

});
