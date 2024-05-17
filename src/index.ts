import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import {changeFeature, getAllFeatures, getCurrentGame, getFeatureState, startGame} from "./max";
import {Pace, FeatureState, Feature, RedLightGreenLightState, Games, Game} from './types';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Middleware for error handling
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
}

/**
 * Sends a 'Hello, world' message.
 *
 * @name GET /
 *
 * @return {string} - Welcome message
 *
 * @throws {500} - Server error
 */
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world! Is this going through?');
});

/**
 * Get the state of ALL features in body
 *
 * @name GET /features
 *
 * @return {object} - All playground states
 *
 * @throws {500} - Server error
 */
app.get('/features', (req: Request, res: Response, next: NextFunction) => {
    try {
        const features = getAllFeatures();
        res.status(200).send({ message: 'Retrieved all Features', features: features });
    } catch (error) {
        next(error);
    }
});

/**
 * Get the state of a specific feature in body
 *
 * @name GET /features/:name
 *
 * @param {string} name - Name of the feature
 * @return {Feature} - The state of the specified feature
 *
 * @throws {404} - Feature not found
 * @throws {500} - Server error
 */
app.get('/features/:name', (req: Request, res: Response, next: NextFunction) => {
    console.log('hi');
    try {
        const { name } = req.params;
        const state = getFeatureState(name);
        const feature = { name, state } as Feature;

        if (state) {
            res.status(200).send({ message: 'Retrieved Feature', feature });
        } else {
            res.status(404).send({ message: 'Feature not found', feature });
        }

    } catch (error) {
        next(error);
    }
});

/**
 * Change a feature's state to state given in req.body
 *
 * @name PUT /features/:name
 *
 * @param {string} name - Name of the feature
 * @param {FeatureState} body - The new state for the feature
 * @return {object} - Success message with updated feature name and state
 *
 * @throws {400} - Bad request if validation fails
 * @throws {500} - Server error
 */
app.put('/features/:name', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.params;
        const state: FeatureState = req.body;
        const feature = { name, state } as Feature;

        const success = changeFeature(name, state);

        if (success) {
            res.status(200).send({ message: 'Changed Feature', feature });
        } else {
            res.status(400).send({ message: 'Could not Change Feature', feature });
        }

    } catch (error) {
        next(error);
    }
});

/**
 * Get the state of the current game
 *
 * @name GET /games
 *
 * @return {object} - The current game state or a message indicating no game is running
 *
 * @throws {500} - Server error
 */
app.get('/games', (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = getCurrentGame();
        if (game.state.ongoing) {
            res.send({ game });
        } else {
            res.send({ message: 'No game is currently running' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * Start a global game
 *
 * @name PUT /games/
 *
 * @param {string} gameName - Name of the game
 * @param {RedLightGreenLightState} body - The settings for the game
 * @return {object} - Success message with game name and settings
 *
 * @throws {400} - Bad request if validation fails
 * @throws {500} - Server error
 */
app.put('/games', (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = req.body as Game;
        const success = startGame(game);

        if (success) {
            res.status(200).send({ message: 'Game started', game });
        } else {
            res.status(400).send({ message: 'Game could not be started' });
        }
    } catch (error) {
        next(error);
    }
});

// Error handling middleware should be the last middleware
app.use(errorHandler);

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
