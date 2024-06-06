import {FeatureName, FeatureState, Game} from "./types";
import CasaState from "./casaState";

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

    if (prev_state) {
        // updateFeatureState(featureName, state, prev_state)
    } else {
        // setFeatureState(featureName, state)
    }

    casaState.setFeature(featureName, state)
    return true
}

export function setGame(game: Game) {
    // startGame(game)
    casaState.setGame(game)
    return true
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

    casaState.setGame(game)
    return currentGame
}

/*********************************************
 * End / Reset
 **********************************************/

/**
 * Set game to null
 * Set Features to default Modes
 */
export function stopGame() {
    const currentGame = casaState.getGame()
    if (currentGame) {
        // endGame(currentGame.name)
    }

    const defaultFeatures = casaState.getDefaultFeatures()
    casaState.setFeaturesMode(defaultFeatures)
    casaState.setGame(null)
    return true
}

/**
 * Hard RESET
 *
 * Primarily happens on request from Webapp
 */
export function resetComputer() {
    casaState.reset()
    // TODO: reset
    return true
}