import express, {NextFunction, Request, Response} from "express";
import {getFeatures, getGame, resetComputer} from "../casaHandler";
import {broadcast} from "../casaServer";
import {usersRouter} from "./users/router";
import {gameRouter} from "./game/router";
import {featuresRouter} from "./features/router";

const router = express.Router();


/**
 * Sends a 'Hello, world' message.
 *
 * @name GET /
 *
 * @return {string} - Welcome message
 *
 * @throws {500} - Server error
 */
router.get('/', (req: Request, res: Response) => {
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
router.delete('/', (req: Request, res: Response, next: NextFunction) => {
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

router.use('/users', usersRouter);
router.use('/game', gameRouter);
router.use('/features', featuresRouter);

export { router as apiRouter}
