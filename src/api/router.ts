import express, {NextFunction, Request, Response} from "express";
import {getFeatures, getGame, resetComputer} from "../casaHandler";
import {usersRouter} from "./users/router";
import {gameRouter} from "./game/router";
import {featuresRouter} from "./features/router";

const router = express.Router();


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

        const message = 'Reset all features'
        const httpMessage = { message, features, game }

        res.status(202).send(httpMessage);
        if (req.broadcast) {
            req.broadcast(message);
        }
    } catch (error) {
        res.status(400).send({ message: 'Features could not be reset', error });
    }
});

router.use('/users', usersRouter);
router.use('/game', gameRouter);
router.use('/features', featuresRouter);

export { router as apiRouter}
