"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameRouter = void 0;
const express_1 = __importDefault(require("express"));
const handler = __importStar(require("../../casaHandler"));
const utils_1 = require("./utils");
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
        const game = handler.getGame();
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
router.post('/', [], (req, res) => {
    try {
        const game = handler.startGame((0, utils_1.createGame)(req));
        const features = handler.getFeatures();
        const message = 'Game started';
        const httpMessage = { message, game, features };
        res.status(200).send(httpMessage);
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
router.put('/', [], (req, res) => {
    try {
        const requestGame = (0, utils_1.createGame)(req);
        handler.updateGame(requestGame);
        const features = handler.getFeatures();
        const game = handler.getGame();
        const message = 'Game modified';
        const httpMessage = { message, game, features };
        res.status(202).send(httpMessage);
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
        handler.userLastRound();
        const features = handler.getFeatures();
        const game = handler.getGame();
        const message = 'Game modified';
        const httpMessage = { message, game, features };
        res.status(202).send(httpMessage);
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
        const game = handler.endGame();
        const features = handler.getFeatures();
        const message = 'Game Stopped';
        const httpMessage = { game, features };
        res.status(202).send(httpMessage);
        if (req.broadcast) {
            req.broadcast(message);
        }
    }
    catch (error) {
        res.status(400).send({ message: 'Game unable to be stopped', error });
    }
});
