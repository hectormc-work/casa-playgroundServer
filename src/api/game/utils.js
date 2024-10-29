"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGame = void 0;
const types_1 = require("../../types");
function createGame(req) {
    const game = new types_1.Game(req.body);
    if (!game.duration) {
        game.duration = 30 * 60 * 1000; // m * s * ms
    }
    return game;
}
exports.createGame = createGame;
