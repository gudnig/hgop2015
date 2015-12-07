Create game

Given []
When [CreateGame]
Then [GameCreated]

Join game

Given []
When [JoinGame]
Then [NoGameToJoin]

Given [GameCreated]
When [JoinGame]
Then [GameJoined]

Legal scenarios

Given [ Placed(0,0,X) ]
When [ Place(1,1,O) ]
Then [ Placed(1,1,O) ]

Given []
When [Place(0,2,X)]
Then [Placed(0,2,X)]

Illegal scenarios

Given [Placed(1,1,X)]
When [Place(1,1,O)]
Then []

Given []
When [Place(0,3,X)]
Then []

Given []
When [Place(-1,2,X)]
Then []

Win scenarios

Given [ Placed(0,0,X), Placed(0,1,X) ]
When [ Place(0,2,X) ]
Then [ Placed(0,2,X), X Won ]

Given [Placed(1,1,O), Placed(2,2,O)]
When [Place(0,0,O)]
Then [Placed(0,0,O), O Won]

Given [ Placed(1,1,X), Placed(0,2,X) ]
When [ Place(2,0,X) ]
Then [ Placed(2,0,X), X Won ]

Given [Placed(1,1,X), Placed(0,1,X)]
When [Place(2,1,X)]
Then [Placed(2,1,X), X Won]

Given [Placed(1,1,X), Placed(2,2,O), Placed(0,0,X), 
       Placed(2,1,O), Placed(2,0,X), Placed(0,2,O))]
When [Place(1,0,X)]
Then [Placed(1,0,X), X Won]

Draw scenarios

Given [Placed(1,1,X), Placed(2,2,O), Placed(0,0,X), 
       Placed(2,0,O), Placed(2,1,X), Placed(0,1,O)),
	   Placed(1,2,X), Placed(1,0,O)]
When [Place(0,2,X)]
Then [Placed(0,2,X), Draw]

Given[Placed(0,0,X), Placed(1,1,O), Placed(1,0,X), 
      Placed(2,0,O), Placed(0,2,X), Placed(0,1,O), 
      Placed(2,1,X), Placed(1,2,O)]
When[Place(2,2,X)]
Then[Placed(2,2,X), Draw]


