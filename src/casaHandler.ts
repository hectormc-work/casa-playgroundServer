import {FeatureName, FeatureState, Game, GameName} from "./types";
import CasaState from "./casaState";
// import * as max from "./max";
import {broadcast} from "./casa_server";

// If you want to make a change, it needs to start here
// This is the only file that imports CasaState

const casaState = CasaState.getInstance()

/*********************************************
 * Getters
 **********************************************/

export function getFeatureState(featureName: FeatureName) {
    return casaState.getFeatureState(featureName);
}

export function getFeatures() {
    return casaState.getFeatures();
}

export function getGame() {
    return casaState.getGame()
}

/*********************************************
 * Setters
 **********************************************/

export function setFeature(featureName: FeatureName, state: FeatureState) {
    const prev_state = casaState.getFeatureState(featureName);

    // MAX
    if (prev_state) {
        // max.updateFeatureState(featureName, state, prev_state)
    } else {
        // max.setFeatureState(featureName, state)
    }

    casaState.setFeature(featureName, state)
    return true
}

export function checkGameEnd(gameWasOngoing: boolean) {
    const game = casaState.getGame()
    if (!game) {
        return false;
    }

    if (gameWasOngoing && !game.isOngoing()) {
        endGame()
        return false
    }

    return game.isOngoing() // game still going
}

/*********************************************
 * End / Reset
 **********************************************/

/**
 * Game
 */

export function startGame(game: Game) {
    // MAX
    if (game) {
        // max.startGame(game)
    }
    casaState.setGame(game)
    return casaState.getGame()
}

/*********************************************
 * Update
 **********************************************/

export function updateGame(game: Game) {
    // When updating, ignore startTime
    const currentGame = casaState.getGame()
    if (currentGame) {
        game.startTime = currentGame.startTime;
    }
    // max.maxUpdateGame(game)

    casaState.setGame(game)
    return currentGame
}

/**
 * User ended the game:
 *  set game to null
 *      side-effect: all features in game reset to default
 *  tell max to end game
 */
export function endGame() {
    const oldGame = casaState.getGame()

    const features = casaState.getFeaturesMap()

    casaState.setGame(null)
    // TODO: brute force fix for this issue for now
    if (oldGame) {
        // MAX
        // max.endGame(oldGame.name, features) // sends message to max to end game
    } else {
        // max.endGame(GameName.monster, features)
        // max.endGame(GameName.rlgl, features)
    }

    broadcast('Game Ended')

    return casaState.getGame()
}

/**
 * User has set game to last round
 */
export function userLastRound() {
    const game = casaState.getGame()
    if (game !== null) {
        // MAX
        // max.maxSetLastRound(game.name)
    }
}

/**
 * Hard RESET
 *
 * Primarily happens on request from Webapp
 */
export function reset() {
    casaState.restoreDefaultState()
    // max.resetServer();
    return true
}