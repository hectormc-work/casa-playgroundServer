import {BabyMonstersState, Feature, FeatureState, Game, Games, RedLightGreenLightState} from "./types";

// Storing game State here to be sent out
let features: Feature[] = [];
let currentGame: Game = {name: Games.rlgl, state: {ongoing: false}};

export function getFeatureState(featureName: string) {
    // Query max patch
    return {} as FeatureState;
}

export function getAllFeatures() {
    return [] as Feature[];
}

export function changeFeature(state: FeatureState) {
    // Logic to change feature

    return {} as Feature // true if change went through, else false
}

export function getCurrentGame() {
    return {} as Game
}

export function startGame(state: RedLightGreenLightState | BabyMonstersState) {
    // logic to start game

    return {} as Game // if game started properly
}
