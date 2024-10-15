"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const types_1 = require("./types");
const casaHandler_1 = require("./casaHandler");
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const port = 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Middleware for error handling
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
}
// WebSocket setup
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === ws_1.WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
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
app.get('/', (req, res) => {
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
app.delete('/', (req, res, next) => {
    try {
        (0, casaHandler_1.resetComputer)();
        const features = (0, casaHandler_1.getFeatures)();
        const game = (0, casaHandler_1.getGame)();
        const message = { message: 'Reset all features', features, game };
        res.status(202).send(message);
        broadcast(message);
    }
    catch (error) {
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
app.get('/features', (req, res, next) => {
    try {
        const features = (0, casaHandler_1.getFeatures)();
        res.status(200).send({ message: 'Retrieved all Features', features });
    }
    catch (error) {
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
app.get('/features/:name', (req, res, next) => {
    try {
        const { name } = req.params;
        const state = (0, casaHandler_1.getFeatureState)(name);
        const feature = { name, state };
        if (state) {
            res.status(200).send({ message: 'Retrieved Feature', feature });
        }
        else {
            res.status(404).send({ message: 'Feature not found', feature });
        }
    }
    catch (error) {
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
app.put('/features/:name', (req, res, next) => {
    try {
        const { name } = req.params;
        const state = req.body;
        const feature = { name, state };
        const success = (0, casaHandler_1.setFeature)(name, state);
        if (success) {
            const message = { message: 'Changed Feature', feature };
            res.status(200).send(message);
            broadcast(message);
        }
        else {
            res.status(400).send({ message: 'Could not Change Feature', feature });
        }
    }
    catch (error) {
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
app.get('/games', (req, res, next) => {
    try {
        const game = (0, casaHandler_1.getGame)();
        res.send({ message: 'Got CurrentGame', game });
    }
    catch (error) {
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
app.post('/games', (req, res, next) => {
    try {
        const requestGame = new types_1.Game(req.body);
        const game = (0, casaHandler_1.setGame)(requestGame);
        const features = (0, casaHandler_1.getFeatures)();
        const message = { message: 'Game started', game, features };
        res.status(200).send(message);
        broadcast(message);
    }
    catch (error) {
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
app.put('/games', (req, res, next) => {
    try {
        const requestGame = new types_1.Game(req.body);
        (0, casaHandler_1.updateGame)(requestGame);
        const features = (0, casaHandler_1.getFeatures)();
        const game = (0, casaHandler_1.getGame)();
        const message = { message: 'Game modified', game, features };
        res.status(202).send(message);
        broadcast(message);
    }
    catch (error) {
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
app.delete('/games', (req, res, next) => {
    try {
        const game = (0, casaHandler_1.stopGame)();
        const features = (0, casaHandler_1.getFeatures)();
        const message = { message: 'Game Stopped', game, features };
        res.status(202).send(message);
        broadcast(message);
    }
    catch (error) {
        res.status(400).send({ message: 'Game unable to be stopped', error });
    }
});
// Error handling middleware should be the last middleware
app.use(errorHandler);
// Start the Express server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
