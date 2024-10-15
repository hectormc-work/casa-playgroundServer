"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetComputer = exports.stopGame = exports.lastRound = exports.updateGame = exports.setGame = exports.setFeature = exports.getGame = exports.getFeatures = exports.getFeatureState = void 0;
const casaState_1 = __importDefault(require("./casaState"));
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
    if (prev_state) {
        // updateFeatureState(featureName, state, prev_state)
    }
    else {
        // setFeatureState(featureName, state)
    }
    casaState.setFeature(featureName, state);
    return true;
}
exports.setFeature = setFeature;
function setGame(game) {
    // startGame(game)
    casaState.setGame(game);
    return casaState.getGame();
}
exports.setGame = setGame;
/*********************************************
 * Update
 **********************************************/
function updateGame(game) {
    // When updating, ignore startTime
    const currentGame = casaState.getGame();
    if (currentGame) {
        game.startTime = currentGame.startTime;
    }
    casaState.setGame(game);
    return currentGame;
}
exports.updateGame = updateGame;
function lastRound() {
    const game = casaState.getGame();
    // maxSetLastRound(game.name)
}
exports.lastRound = lastRound;
/*********************************************
 * End / Reset
 **********************************************/
/**
 * Set game to null
 * Set Features to default Modes
 */
function stopGame() {
    const currentGame = casaState.getGame();
    if (currentGame) {
        // endGame(currentGame.name)
    }
    const defaultFeatures = casaState.getDefaultFeatures();
    casaState.setFeaturesMode(defaultFeatures);
    casaState.setGame(null);
    return true;
}
exports.stopGame = stopGame;
/**
 * Hard RESET
 *
 * Primarily happens on request from Webapp
 */
function resetComputer() {
    casaState.reset();
    // TODO: reset
    return true;
}
exports.resetComputer = resetComputer;
