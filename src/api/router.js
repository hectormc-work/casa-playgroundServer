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
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const handler = __importStar(require("../casaHandler"));
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
        handler.reset();
        const features = handler.getFeatures();
        const game = handler.getGame();
        const message = 'Reset all features';
        const httpMessage = { message, features, game };
        res.status(202).send(httpMessage);
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
