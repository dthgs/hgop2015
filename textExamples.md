#Text Examples
Start preparing for implementing unit tests for a tic-tac-toe server by collecting examples using an event based approach. See lecture.

Consider failure (illegal move) scenarios. Do not trust the clients to always do the right things in the right order.
Consider winning scenarios. Hint: There are at least three winning scenarios that must be considered from a programming perspective.
Consider draw scenarios.

##Failure (illegal move) scenarioshttps://github.com/dthgs/hgop2015
**Tile already taken**

Given [ Placed(0,0,X) ]

When [ Place(0,0,O) ]

Then [ illegalMove ]

**Out of bounds**

Given [ ]

When [ Place(3,3,X) ]

Then [ outOfBounds ]

**Two moves**

Given [ Placed(0,0,X) ]

When [ Place(0,1,X) ]

Then [ illegalMove ]

##Winning scenarios
**Vertical win**

Given [ Placed(0,0,X), Placed(1,0,O), Placed(0,1,X), Placed(1,1,O) ]

When [ Place(0,2,X) ]

Then [ X Won ]

**Horizontal win**

Given [ Placed(0,0,X), Placed(0,1,O), Placed(1,0,X), Placed(0,2,O) ]

When [ Place(2,0,X) ]

Then [ X Won ]

**Diagonal win**

Given [ Placed(0,0,X), Placed(1,0,O), Placed(1,1,X), Placed(2,0,O) ]

When [ Place(2,2,X) ]

Then [ X Won ]

##Draw scenarios

**Draw scenario 1**

Given [ Placed(0,0,X), Placed(1,0,O), Placed(2,0,X), Placed(0,1,O), Placed(1,1,X), Placed(2,1,X), Placed(0,2,O), Placed(2,2,O) ]

When [ Place(1,2,X) ]

Then [ Draw ]

**Draw scenario 2**

Given [ Placed(1,0,X), Placed(0,0,O), Placed(2,0,X), Placed(0,1,O), Placed(0,2,X), Placed(1,1,O), Placed(2,1,X), Placed(2,2,O) ]

When [ Place(1,2,X) ]

Then [ Draw ]
