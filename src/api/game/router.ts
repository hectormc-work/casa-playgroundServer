import express, {NextFunction, Request, Response} from "express";
import {getFeatures, getGame, setGame, stopGame, updateGame} from "../casaHandler";
import {Game} from "../types";
import {broadcast} from "../casaServer";

const router = express.Router();

/**
 * Get the state of the current game
 *
 * @name GET /games
 *
 * @return {object} - The current game state or a message indicating no game is running
 *
 * @throws {500} - Server error
 */


router.get('/', (req: Request, res: Response, next: NextFunction) => {
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
router.post('/', (req: Request, res: Response, next: NextFunction) => {
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
router.put('/games', (req: Request, res: Response, next: NextFunction) => {
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
router.delete('/games', (req: Request, res: Response, next: NextFunction) => {
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

export { router as gameRouter }
