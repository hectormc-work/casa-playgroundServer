import {Game} from "../../types";
import {Request} from "express";

export function createGame(req: Request) {
    const game = new Game(req.body);
    if (!game.duration) {
        game.duration = 30 * 60 * 1000 // m * s * ms
    }
    return game
}