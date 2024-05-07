# API Запросы

> ## Основная информация
> * Запрос/Ответ
> * Входные параметры
> * Проверки
> * Выходные параметры
> * Положительный ответ
> * Ответ с ошибками
> * Описание интеграции

## Create user
* /user/{user_id}
* POST
* input:
```
user_id (integer)
```

* output:

#### 🟢 Successful Response(200):
```
{
	"id": 0,
	"games": [
		"string"
	]
}
```

#### 🔴 Validation Error(422):
```
{
"detail": [
		{
		"loc": [
			"string",
			0
		],
		"msg": "string",
		"type": "string"
		}
]
}
```

## Get Owned Games
* /user/{user_id}/games
* GET
* input:
```
user_id (integer)
```
* output:

#### 🟢 Successful Response:
```
[
  {
    "id": 0,
    "owner": {
      "id": 0,
      "games": [
        "string"
      ]
    },
    "ownerId": 0,
    "logoURL": "string",
    "background": 0,
    "welcomeTitle": "string",
    "welcomeBody": "string",
    "subject": "string",
    "leaveTitle": "string",
    "leaveBody": "string",
    "leaveURL": "string",
    "gameType": "CLASSIC",
    "classicCards": [
      {
        "id": 0,
        "game": "string",
        "gameId": 0,
        "term": "string",
        "description": "string"
      }
    ],
    "rounds": 0,
    "matchCards": [
      {
        "id": 0,
        "game": "string",
        "gameId": 0,
        "imageURL": "string",
        "name": "string",
        "description": "string"
      }
    ]
  }
]
```

#### 🔴 Validation Error(422):
```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```


## Get Game
* /game/{game_id}
* GET
* input:
```
game_id (integer)
```
* output: 

#### 🟢 Successful Response(200):
```
{
  "id": 0,
  "owner": {
    "id": 0,
    "games": [
      "string"
    ]
  },
  "ownerId": 0,
  "logoURL": "string",
  "background": 0,
  "welcomeTitle": "string",
  "welcomeBody": "string",
  "subject": "string",
  "leaveTitle": "string",
  "leaveBody": "string",
  "leaveURL": "string",
  "gameType": "CLASSIC",
  "classicCards": [
    {
      "id": 0,
      "game": "string",
      "gameId": 0,
      "term": "string",
      "description": "string"
    }
  ],
  "rounds": 0,
  "matchCards": [
    {
      "id": 0,
      "game": "string",
      "gameId": 0,
      "imageURL": "string",
      "name": "string",
      "description": "string"
    }
  ]
}
```

#### 🔴 Validation Error(422):
```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```


## Delete Game
* /game/{game_id}
* DELETE
* input:
```
game_id (integer)
```
* output:

#### 🟢 Successful Response(200):
```
{
  "cardsDeleted": 0,
  "deletedGame": {
    "id": 0,
    "owner": {
      "id": 0,
      "games": [
        "string"
      ]
    },
    "ownerId": 0,
    "logoURL": "string",
    "background": 0,
    "welcomeTitle": "string",
    "welcomeBody": "string",
    "subject": "string",
    "leaveTitle": "string",
    "leaveBody": "string",
    "leaveURL": "string",
    "gameType": "CLASSIC",
    "classicCards": [
      {
        "id": 0,
        "game": "string",
        "gameId": 0,
        "term": "string",
        "description": "string"
      }
    ],
    "rounds": 0,
    "matchCards": [
      {
        "id": 0,
        "game": "string",
        "gameId": 0,
        "imageURL": "string",
        "name": "string",
        "description": "string"
      }
    ]
  }
}
```

#### 🔴 Validation Error(422):
```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```



## Modify Game
* /game/{game_id}
* PUT
* input:
```
game_id (integer)
```

#### Request body (application/json)
```
{
  "logoURL": "string",
  "background": 0,
  "welcomeTitle": "string",
  "welcomeBody": "string",
  "subject": "string",
  "leaveTitle": "string",
  "leaveBody": "string",
  "leaveURL": "string",
  "rounds": 0
}
```

* output:

#### 🟢 Successful Response(200):
```
{
  "id": 0,
  "owner": {
    "id": 0,
    "games": [
      "string"
    ]
  },
  "ownerId": 0,
  "logoURL": "string",
  "background": 0,
  "welcomeTitle": "string",
  "welcomeBody": "string",
  "subject": "string",
  "leaveTitle": "string",
  "leaveBody": "string",
  "leaveURL": "string",
  "gameType": "CLASSIC",
  "classicCards": [
    {
      "id": 0,
      "game": "string",
      "gameId": 0,
      "term": "string",
      "description": "string"
    }
  ],
  "rounds": 0,
  "matchCards": [
    {
      "id": 0,
      "game": "string",
      "gameId": 0,
      "imageURL": "string",
      "name": "string",
      "description": "string"
    }
  ]
}
```

#### 🔴 Validation Error(422):
```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

## Create Game
* /game
* POST
* input:

#### Request body (application/json)
```
{
  "ownerId": 0,
  "logoURL": "string",
  "background": 0,
  "welcomeTitle": "string",
  "welcomeBody": "string",
  "subject": "string",
  "leaveTitle": "string",
  "leaveBody": "string",
  "leaveURL": "string",
  "gameType": "CLASSIC",
  "classicCards": [],
  "rounds": 0,
  "matchCards": []
}
```

* output:
#### 🟢 Successful Response(201):
```
{
  "id": 0,
  "owner": {
    "id": 0,
    "games": [
      "string"
    ]
  },
  "ownerId": 0,
  "logoURL": "string",
  "background": 0,
  "welcomeTitle": "string",
  "welcomeBody": "string",
  "subject": "string",
  "leaveTitle": "string",
  "leaveBody": "string",
  "leaveURL": "string",
  "gameType": "CLASSIC",
  "classicCards": [
    {
      "id": 0,
      "game": "string",
      "gameId": 0,
      "term": "string",
      "description": "string"
    }
  ],
  "rounds": 0,
  "matchCards": [
    {
      "id": 0,
      "game": "string",
      "gameId": 0,
      "imageURL": "string",
      "name": "string",
      "description": "string"
    }
  ]
}
```

#### 🔴 Validation Error(422):
```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```


## Create Classic Card
* /classiccard
* POST
* input:

#### Request body (application/json)
```
{
  "term": "string",
  "description": "string",
  "gameId": 0
}
```

* output:
#### 🟢 Successful Response(200):
```
{
  "id": 0,
  "game": "string",
  "gameId": 0,
  "term": "string",
  "description": "string"
}
```

#### 🔴 Validation Error(422):
```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

## Delete Classic Card
* /classiccard/{card_id}
* DELETE
* input:
```
card_id (integer)
```
* output:

#### 🟢 Successful Response(200):
```
{
  "id": 0,
  "game": "string",
  "gameId": 0,
  "term": "string",
  "description": "string"
}
```

#### 🔴 Validation Error(422):
```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

## Modify Classic Card
* /classiccard/{card_id}
* PUT
* input:
```
card_id(int)
```
#### Request_body (application/json)
```
{
  "term": "string",
  "description": "string"
}
```
* output:
#### 🟢 Successful Response(200):
```
{
  "id": 0,
  "game": "string",
  "gameId": 0,
  "term": "string",
  "description": "string"
}
```

#### 🔴 Validation Error(422):
```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

## Create Match Card
* /matchcard
* POST
* input:
#### Request_body (application/json):
```
{
  "imageURL": "string",
  "name": "string",
  "description": "string",
  "gameId": 0
}
```

* output:
#### 🟢 Successful Response(200):
```
{
  "id": 0,
  "game": {
    "id": 0,
    "owner": {
      "id": 0,
      "games": [
        "string"
      ]
    },
    "ownerId": 0,
    "logoURL": "string",
    "background": 0,
    "welcomeTitle": "string",
    "welcomeBody": "string",
    "subject": "string",
    "leaveTitle": "string",
    "leaveBody": "string",
    "leaveURL": "string",
    "gameType": "CLASSIC",
    "classicCards": [
      {
        "id": 0,
        "game": "string",
        "gameId": 0,
        "term": "string",
        "description": "string"
      }
    ],
    "rounds": 0,
    "matchCards": [
      "string"
    ]
  },
  "gameId": 0,
  "imageURL": "string",
  "name": "string",
  "description": "string"
}
```


#### 🔴 Validation Error(422):
```
 {
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```



## Delete Match Card
* /matchcard/{card_id}
* DELETE
* input:
```
card_id(int)
```
* output:
#### 🟢 Successful Response(200):
```
{
  "id": 0,
  "game": {
    "id": 0,
    "owner": {
      "id": 0,
      "games": [
        "string"
      ]
    },
    "ownerId": 0,
    "logoURL": "string",
    "background": 0,
    "welcomeTitle": "string",
    "welcomeBody": "string",
    "subject": "string",
    "leaveTitle": "string",
    "leaveBody": "string",
    "leaveURL": "string",
    "gameType": "CLASSIC",
    "classicCards": [
      {
        "id": 0,
        "game": "string",
        "gameId": 0,
        "term": "string",
        "description": "string"
      }
    ],
    "rounds": 0,
    "matchCards": [
      "string"
    ]
  },
  "gameId": 0,
  "imageURL": "string",
  "name": "string",
  "description": "string"
}
```

#### 🔴 Validation Error(422):
```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

## Modify Match Card
* /matchcard/{card_id}
* PUT
* input:
#### Request_body (application/json)
```
{
  "imageURL": "string",
  "name": "string",
  "description": "string"
}
```

* output:
#### 🟢 Successful Response(200):
```
{
  "id": 0,
  "game": {
    "id": 0,
    "owner": {
      "id": 0,
      "games": [
        "string"
      ]
    },
    "ownerId": 0,
    "logoURL": "string",
    "background": 0,
    "welcomeTitle": "string",
    "welcomeBody": "string",
    "subject": "string",
    "leaveTitle": "string",
    "leaveBody": "string",
    "leaveURL": "string",
    "gameType": "CLASSIC",
    "classicCards": [
      {
        "id": 0,
        "game": "string",
        "gameId": 0,
        "term": "string",
        "description": "string"
      }
    ],
    "rounds": 0,
    "matchCards": [
      "string"
    ]
  },
  "gameId": 0,
  "imageURL": "string",
  "name": "string",
  "description": "string"
}
```

#### 🔴 Validation Error(422):
```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
