"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = exports.userLastRound = exports.endGame = exports.updateGame = exports.startGame = exports.checkGameEnd = exports.setFeature = exports.getGame = exports.getFeatures = exports.getFeatureState = void 0;
const casaState_1 = __importDefault(require("./casaState"));
// import * as max from "./max";
const casa_server_1 = require("./casa_server");
// If you want to make a change, it needs to start here
// This is the only file that imports CasaState
const casaState = casaState_1.default.getInstance();
/*********************************************
 * Getters
 **********************************************/
function getFeatureState(featureName) {
    return casaState.getFeatureState(featureName);
}
exports.getFeatureState = getFeatureState;
function getFeatures() {
    return casaState.getFeatures();
}
exports.getFeatures = getFeatures;
function getGame() {
    return casaState.getGame();
}
exports.getGame = getGame;
/*********************************************
 * Setters
 **********************************************/
function setFeature(featureName, state) {
    const prev_state = casaState.getFeatureState(featureName);
    // MAX
    if (prev_state) {
        // max.updateFeatureState(featureName, state, prev_state)
    }
    else {
        // max.setFeatureState(featureName, state)
    }
    casaState.setFeature(featureName, state);
    return true;
}
exports.setFeature = setFeature;
function checkGameEnd(gameWasOngoing) {
    const game = casaState.getGame();
    if (!game) {
        return false;
    }
    if (gameWasOngoing && !game.isOngoing()) {
        endGame();
        return false;
    }
    return game.isOngoing(); // game still going
}
exports.checkGameEnd = checkGameEnd;
/*********************************************
 * End / Reset
 **********************************************/
/**
 * Game
 */
function startGame(game) {
    // MAX
    if (game) {
        // max.startGame(game)
    }
    casaState.setGame(game);
    return casaState.getGame();
}
exports.startGame = startGame;
/*********************************************
 * Update
 **********************************************/
function updateGame(game) {
    // When updating, ignore startTime
    const currentGame = casaState.getGame();
    if (currentGame) {
        game.startTime = currentGame.startTime;
    }
    // max.maxUpdateGame(game)
    casaState.setGame(game);
    return currentGame;
}
exports.updateGame = updateGame;
/**
 * User ended the game:
 *  set game to null
 *      side-effect: all features in game reset to default
 *  tell max to end game
 */
function endGame() {
    const oldGame = casaState.getGame();
    const features = casaState.getFeaturesMap();
    casaState.setGame(null);
    // TODO: brute force fix for this issue for now
    if (oldGame) {
        // MAX
        // max.endGame(oldGame.name, features) // sends message to max to end game
    }
    else {
        // max.endGame(GameName.monster, features)
        // max.endGame(GameName.rlgl, features)
    }
    (0, casa_server_1.broadcast)('Game Ended');
    return casaState.getGame();
}
exports.endGame = endGame;
/**
 * User has set game to last round
 */
function userLastRound() {
    const game = casaState.getGame();
    if (game !== null) {
        // MAX
        // max.maxSetLastRound(game.name)
    }
}
exports.userLastRound = userLastRound;
/**
 * Hard RESET
 *
 * Primarily happens on request from Webapp
 */
function reset() {
    casaState.restoreDefaultState();
    // max.resetServer();
    return true;
}
exports.reset = reset;
