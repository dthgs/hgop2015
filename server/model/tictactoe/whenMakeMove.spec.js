'use strict';

const tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('make move cmd', () => {
	
	var given, when, then;

	beforeEach(function() {
		given = [{
			cmdID: '1234',
			event: 'GameCreated',
			gameId: 123,
			userName: 'Daniel',
			gameName: 'Test Game 123',
			timeStamp: '2015.13.10.T08:12:30'
		},{
			cmdID: '4567',
			event: 'GameJoined',
			gameId: 123,
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
				gameId: 123,
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
				gameId: 123,
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

	describe('with one previous move', () => {
		it('should be invalid when tile is taken', () => {
			given.push({
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 0,
				y: 0,
				side: 'X',
				timeStamp: '2015.12.10.T09:05:10'
			});
			when = {
				cmdID: '1010',
				command: 'MakeMove',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 0,
				y: 0,
				side: 'O',
				timeStamp: '2015.12.10.T09:06:20'
			}; 
			then = [{
				cmdID: '1010',
				event: 'IllegalMove',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 0,
				y: 0,
				side: 'O',
				timeStamp: '2015.12.10.T09:06:20'
			}];
		
			const actualEvents = tictactoeCommandHandler(given).executeCommand(when);
			JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
		});
	});

});
