"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const max_1 = require("./max");
const types_1 = require("./types");
const app = (0, express_1.default)();
const port = 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Middleware for error handling
function errorHandler(err, req, res, next) {
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
app.get('/', (req, res) => {
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
app.get('/features', (req, res, next) => {
    try {
        const features = (0, max_1.getAllFeatures)();
        res.status(200).send({ message: 'Retrieved all Features', features: features });
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
        const state = (0, max_1.getFeatureState)(name);
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
        const success = (0, max_1.changeFeature)(name, state);
        if (success) {
            res.status(200).send({ message: 'Changed Feature', feature });
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
        const game = (0, max_1.getCurrentGame)();
        res.send({ message: 'Got CurrentGame', game });
    }
    catch (error) {
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
app.put('/games', (req, res, next) => {
    try {
        const game = new types_1.Game(req.body);
        const success = (0, max_1.startGame)(game);
        if (success) {
            res.status(200).send({ message: 'Game started', game });
        }
        else {
            res.status(400).send({ message: 'Game could not be started' });
        }
    }
    catch (error) {
        next(error);
    }
});
// Error handling middleware should be the last middleware
app.use(errorHandler);
// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log((0, max_1.loadState)() ? 'Successfully loaded State' : 'Failed to load State');
});
