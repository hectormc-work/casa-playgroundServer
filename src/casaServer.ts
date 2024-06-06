import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Feature, FeatureName, FeatureState, Game } from './types';
import {
    getFeatures,
    getFeatureState,
    getGame,
    resetComputer,
    setFeature,
    setGame,
    stopGame,
    updateGame
} from "./casaHandler";
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Middleware for error handling
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
}

// WebSocket setup
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function broadcast(data: any) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    ws.on('message', (message: string) => {
        console.log(`Received message => ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

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
 * Reset Everything
 *
 * @name DELETE /
 *
 * @return {object} - Success message with game name and settings
 *
 * @throws {400} - Bad request if validation fails
 * @throws {500} - Server error
 */
app.delete('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        resetComputer()
        const features = getFeatures()
        const game = getGame()

        const message = { message: 'Reset all features', features, game }

        res.status(202).send(message);
        broadcast(message);
    } catch (error) {
        res.status(400).send({ message: 'Features could not be reset', error });
    }
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
        const features = getFeatures();
        res.status(200).send({ message: 'Retrieved all Features', features });
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
    try {
        const { name } = req.params;
        const state = getFeatureState(name as FeatureName);
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

        const success = setFeature(name as FeatureName, state);

        if (success) {
            const message = { message: 'Changed Feature', feature }

            res.status(200).send(message);
            broadcast(message);
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
        const game = getGame();
        res.send({ message: 'Got CurrentGame', game });
    } catch (error) {
        res.status(400).send({ message: 'Could not get current Game', error });
    }
});

/**
 * Start a global game
 *
 * @name POST /games/
 *
 * @param {string} gameName - Name of the game
 * @param {GameJSON} body
 * @return {object} - Success message with game name and settings
 *
 * @throws {400} - Bad request if validation fails
 * @throws {500} - Server error
 */
app.post('/games', (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestGame = new Game(req.body);
        const game = setGame(requestGame);
        const features = getFeatures()

        const message = { message: 'Game started', game, features }

        res.status(200).send(message);
        broadcast(message);
    } catch (error) {
        res.status(400).send({ message: 'Game could not be started', error });
    }
});

/**
 * Modify an Ongoing Game
 *
 * @name PUT /games/
 *
 * @param {string} gameName - Name of the game
 * @param {GameJSON} body
 * @return {object} - Success message with game name and settings
 *
 * @throws {400} - Bad request if validation fails
 * @throws {500} - Server error
 */
app.put('/games', (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestGame = new Game(req.body);
        updateGame(requestGame);

        const features = getFeatures()
        const game = getGame()

        const message = { message: 'Game modified', game, features }

        res.status(202).send(message);
        broadcast(message);
    } catch (error) {
        res.status(400).send({ message: 'Game could not be changed', error });
    }
});

/**
 * Stop the ongoing Game
 *
 * @name DELETE /games/
 *
 * @return {object} - Success message with game name and settings
 *
 * @throws {400} - Bad request if validation fails
 * @throws {500} - Server error
 */
app.delete('/games', (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = stopGame();
        const features = getFeatures()

        const message = { message: 'Game Stopped', game, features }

        res.status(202).send(message);
        broadcast(message);
    } catch (error) {
        res.status(400).send({ message: 'Game unable to be stopped', error });
    }
});

// Error handling middleware should be the last middleware
app.use(errorHandler);

// Start the Express server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
