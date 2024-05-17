import {BabyMonstersState, Feature, FeatureName, FeatureState, Game, GameName, RedLightGreenLightState} from "./types";

// Storing game State here to be sent out
let features = {} as {[key: string]: FeatureState};
let currentGame: Game = {name: GameName.rlgl, state: {ongoing: true}};

export function getFeatureState(featureName: FeatureName) {
    return features[featureName];
}

export function getAllFeatures() {
    return features;
}

export function changeFeature(featureName: FeatureName, state: FeatureState) {
    features[featureName] = state;

    return true
}

export function getCurrentGame() {
    return currentGame
}

export function startGame(game: Game) {
    currentGame = game
    return true
}
