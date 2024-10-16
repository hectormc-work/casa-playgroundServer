"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const casaHandler_1 = require("../casaHandler");
const router_1 = require("./users/router");
const router_2 = require("./game/router");
const router_3 = require("./features/router");
const router = express_1.default.Router();
exports.apiRouter = router;
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
router.delete('/', (req, res, next) => {
    try {
        (0, casaHandler_1.resetComputer)();
        const features = (0, casaHandler_1.getFeatures)();
        const game = (0, casaHandler_1.getGame)();
        const message = { message: 'Reset all features', features, game };
        res.status(202).send(message);
        if (req.broadcast) {
            req.broadcast(message);
        }
    }
    catch (error) {
        res.status(400).send({ message: 'Features could not be reset', error });
    }
});
router.use('/users', router_1.usersRouter);
router.use('/game', router_2.gameRouter);
router.use('/features', router_3.featuresRouter);
