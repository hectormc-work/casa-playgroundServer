# Base URL

http://localhost:8080

# Endpoints

## GET /

### Description:
Sends a 'Hello, world!' message.

### Response:
`200 OK: Returns a welcome message.`

    "Hello, world!"

### Throws
    500 Internal Server Error: Server error.


## POST /features/{featureName}
Update Feature State

### Path Parameters
| Parameter   | Type   | 	Description             |
|-------------|--------|--------------------------|
| featureName | string | 	The name of the feature |

### Request Body

```
<JSON in the form of index.ts's FeatureState type>
```

### Response
`202 Accepted: Success message with updated feature name and state.`

    <JSON in the form of index.ts's Feature type>

### Throws
    400 Bad Request: Bad request if validation fails.
    500 Internal Server Error: Server error.


## GET /features
Get All Feature States

### Description:
Get the state of all features.

### Response:
`200 OK: Returns all playground states.`

    {
      "playgroundStates": [
        <JSONs in the form of index.ts's Feature type>
      ]
    }

### Throws
    500 Internal Server Error: Server error.


## GET /features/{name}
Get Specific Feature State

### Path Parameters
| Parameter | Type   | Description             |
|-----------|--------|--------------------------|
| name      | string | The name of the feature |

### Description:
Get the state of a specific feature.

### Response:
`200 OK: Returns the state of the specified feature.`

    <json in the form of index.ts's Feature type>

`404 Not Found: Feature not found.`

    {
      "message": "Feature not found"
    }

### Throws
    500 Internal Server Error: Server error.


## POST /games/{gameName}
Start a Game

### Path Parameters
| Parameter | Type   | Description             |
|-----------|--------|--------------------------|
| gameName  | string | The name of the game    |

### Request Body

Look at index.ts's game state types for full detail of what can be returned


### Response
`202 Accepted: Success message with game name and settings.`

    {
      "message": "Game started",
      "currentGame": <Look at index.ts's game state types for full description of what this can contain>
    }

### Throws
    400 Bad Request: Bad request if validation fails.
    500 Internal Server Error: Server error.


## GET /games
Get Current Game State

### Description:
Get the state of the current game.

### Response:
`200 OK: Returns the current game state or a message indicating no game is running.`

    {
      "currentGame": <Look at index.ts's game state types for full description of what this can contain>
    }

`200 OK: No game is currently running.`

    {
      "currentGame": {
        "ongoing": false
      }
    }

### Throws
    500 Internal Server Error: Server error.


