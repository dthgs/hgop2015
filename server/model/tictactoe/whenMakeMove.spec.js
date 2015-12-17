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

	describe('win vertical test', () => {
		it ('X wins with moves 0,0 0,1 and 0,2', () => {
			given.push({
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 0,
				y: 0,
				side: 'X',
				timeStamp: '2015.12.10.T09:10:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 1,
				y: 0,
				side: 'O',
				timeStamp: '2015.12.10.T09:11:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 0,
				y: 1,
				side: 'X',
				timeStamp: '2015.12.10.T09:12:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 1,
				y: 1,
				side: 'O',
				timeStamp: '2015.12.10.T09:13:10'
			});
			when = {
				cmdID: '1010',
				command: 'MakeMove',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 0,
				y: 2,
				side: 'X',
				timeStamp: '2015.12.10.T09:14:10'
			};
			then = [{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 0,
				y: 2,
				side: 'X',
				timeStamp: '2015.12.10.T09:14:10'
			},{
				cmdID:      '1111',
				event:     'GameWon',
				gameId: 123,
				userName:  'Daniel',
				gameName: 'Test Game 123',
				side:      'X',
				timeStamp: '2015.12.10.T09:14:10'
			}];

			const actualEvents = tictactoeCommandHandler(given).executeCommand(when);
			JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
		});
	});

	describe('win horizontal test', () => {
		it ('X wins with moves 0,0 1,0 and 2,0', () => {
			given.push({
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 0,
				y: 0,
				side: 'X',
				timeStamp: '2015.12.10.T09:10:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 0,
				y: 1,
				side: 'O',
				timeStamp: '2015.12.10.T09:11:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 1,
				y: 0,
				side: 'X',
				timeStamp: '2015.12.10.T09:12:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 0,
				y: 2,
				side: 'O',
				timeStamp: '2015.12.10.T09:13:10'
			});
			when = {
				cmdID: '1010',
				command: 'MakeMove',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 2,
				y: 0,
				side: 'X',
				timeStamp: '2015.12.10.T09:14:10'
			};
			then = [{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 2,
				y: 0,
				side: 'X',
				timeStamp: '2015.12.10.T09:14:10'
			},{
				cmdID: '1111',
				event: 'GameWon',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				side: 'X',
				timeStamp: '2015.12.10.T09:14:10'
			}];

			const actualEvents = tictactoeCommandHandler(given).executeCommand(when);
			JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
		});
	});

	describe('win diagonal test', () => {
		it ('X wins with moves 0,0 1,1 and 2,2', () => {
			given.push({
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 0,
				y: 0,
				side: 'X',
				timeStamp: '2015.12.10.T09:10:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 1,
				y: 0,
				side: 'O',
				timeStamp: '2015.12.10.T09:11:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 1,
				y: 1,
				side: 'X',
				timeStamp: '2015.12.10.T09:12:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 2,
				y: 0,
				side: 'O',
				timeStamp: '2015.12.10.T09:13:10'
			});
			when = {
				cmdID: '1010',
				command: 'MakeMove',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 2,
				y: 2,
				side: 'X',
				timeStamp: '2015.12.10.T09:14:10'
			};
			then = [{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 2,
				y: 2,
				side: 'X',
				timeStamp: '2015.12.10.T09:14:10'
			},{
				cmdID: '1111',
				event: 'GameWon',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				side: 'X',
				timeStamp: '2015.12.10.T09:14:10'
			}];

			const actualEvents = tictactoeCommandHandler(given).executeCommand(when);
			JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
		});
	});


	describe('draw test 1', () => {
		it ('nobody wins the game', () => {
			given.push({
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 0,
				y: 0,
				side: 'X',
				timeStamp: '2015.12.10.T09:10:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 1,
				y: 0,
				side: 'O',
				timeStamp: '2015.12.10.T09:11:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 2,
				y: 0,
				side: 'X',
				timeStamp: '2015.12.10.T09:12:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 0,
				y: 1,
				side: 'O',
				timeStamp: '2015.12.10.T09:13:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 1,
				y: 1,
				side: 'X',
				timeStamp: '2015.12.10.T09:14:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 0,
				y: 2,
				side: 'O',
				timeStamp: '2015.12.10.T09:15:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 2,
				y: 1,
				side: 'X',
				timeStamp: '2015.12.10.T09:16:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 2,
				y: 2,
				side: 'O',
				timeStamp: '2015.12.10.T09:17:10'
			});
			when = {
				cmdID: '1010',
				command: 'MakeMove',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 1,
				y: 2,
				side: 'X',
				timeStamp: '2015.12.10.T09:18:10'
			};
			then = [{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 1,
				y: 2,
				side: 'X',
				timeStamp: '2015.12.10.T09:18:10'
			},{
				cmdID: '2222',
				event: 'GameDrawn',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				timeStamp: '2015.12.10.T09:18:10'
			}];

			const actualEvents = tictactoeCommandHandler(given).executeCommand(when);
			JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
		});
	});

	describe('draw test 2', () => {
		it ('nobody wins the game', () => {
			given.push({
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 1,
				y: 0,
				side: 'X',
				timeStamp: '2015.12.10.T09:10:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 0,
				y: 0,
				side: 'O',
				timeStamp: '2015.12.10.T09:11:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 2,
				y: 0,
				side: 'X',
				timeStamp: '2015.12.10.T09:12:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 0,
				y: 1,
				side: 'O',
				timeStamp: '2015.12.10.T09:13:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 0,
				y: 2,
				side: 'X',
				timeStamp: '2015.12.10.T09:14:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 1,
				y: 1,
				side: 'O',
				timeStamp: '2015.12.10.T09:15:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 2,
				y: 1,
				side: 'X',
				timeStamp: '2015.12.10.T09:16:10'
			},{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Jon',
				gameName: 'Test Game 123',
				x: 2,
				y: 2,
				side: 'O',
				timeStamp: '2015.12.10.T09:17:10'
			});
			when = {
				cmdID: '1010',
				command: 'MakeMove',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 1,
				y: 2,
				side: 'X',
				timeStamp: '2015.12.10.T09:18:10'
			};
			then = [{
				cmdID: '1010',
				event: 'MoveMade',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				x: 1,
				y: 2,
				side: 'X',
				timeStamp: '2015.12.10.T09:18:10'
			},{
				cmdID: '2222',
				event: 'GameDrawn',
				gameId: 123,
				userName: 'Daniel',
				gameName: 'Test Game 123',
				timeStamp: '2015.12.10.T09:18:10'
			}];

			const actualEvents = tictactoeCommandHandler(given).executeCommand(when);
			JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
		});
	});


});
