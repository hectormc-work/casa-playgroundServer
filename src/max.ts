import {BabyMonstersState, Feature, FeatureState, Game, RedLightGreenLightState} from "./types";


export function getFeature(featureName: string) {
    return {} as Feature;
}

export function getAllFeatures() {
    return [] as Feature[];
}

export function changeFeature(state: FeatureState) {
    // Logic to change feature

    return true // true if change went through, else false
}

export function getCurrentGame() {
    return {} as Game
}

export function startGame(state: RedLightGreenLightState | BabyMonstersState) {
    // logic to start game

    return true // if game started properly
}
