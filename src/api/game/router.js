"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameRouter = void 0;
const express_1 = __importDefault(require("express"));
const casaHandler_1 = require("../../casaHandler");
const types_1 = require("../../types");
const router = express_1.default.Router();
exports.gameRouter = router;
/**
 * Get the state of the current game
 *
 * @name GET /games
 *
 * @return {object} - The current game state or a message indicating no game is running
 *
 * @throws {500} - Server error
 */
router.get('/', (req, res) => {
    try {
        console.log("hi");
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
router.post('/', (req, res) => {
    try {
        const requestGame = new types_1.Game(req.body);
        const game = (0, casaHandler_1.setGame)(requestGame);
        const features = (0, casaHandler_1.getFeatures)();
        const message = { message: 'Game started', game, features };
        res.status(200).send(message);
        if (req.broadcast) {
            req.broadcast(message);
        }
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
router.put('/', (req, res) => {
    try {
        const requestGame = new types_1.Game(req.body);
        (0, casaHandler_1.updateGame)(requestGame);
        const features = (0, casaHandler_1.getFeatures)();
        const game = (0, casaHandler_1.getGame)();
        const message = { message: 'Game modified', game, features };
        res.status(202).send(message);
        if (req.broadcast) {
            req.broadcast(message);
        }
    }
    catch (error) {
        res.status(400).send({ message: 'Game could not be changed', error });
    }
});
/**
 * Set Ongoing Game to Last Round
 *
 * @name PATCH /games/
 *
 * @param {string} gameName - Name of the game
 * @param {GameJSON} body
 * @return {object} - Success message with game name and settings
 *
 * @throws {400} - Bad request if validation fails
 * @throws {500} - Server error
 */
router.patch('/last-round', (req, res) => {
    try {
        (0, casaHandler_1.lastRound)();
        const features = (0, casaHandler_1.getFeatures)();
        const game = (0, casaHandler_1.getGame)();
        const message = { message: 'Game modified', game, features };
        res.status(202).send(message);
        if (req.broadcast) {
            req.broadcast(message);
        }
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
router.delete('/', (req, res) => {
    try {
        const game = (0, casaHandler_1.stopGame)();
        const features = (0, casaHandler_1.getFeatures)();
        const message = { message: 'Game Stopped', game, features };
        res.status(202).send(message);
        if (req.broadcast) {
            req.broadcast(message);
        }
    }
    catch (error) {
        res.status(400).send({ message: 'Game unable to be stopped', error });
    }
});
