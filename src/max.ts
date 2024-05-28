import {FeatureName, FeatureState, Game, GameName, Pace, RedLightGreenLightOptions} from "./types";
import * as fs from 'fs';

// Storing game State here to be sent out
const filePath = 'state.json';
let features = {} as {[featureName: string]: FeatureState};
let currentGame: Game | null = new Game({
    name: GameName.rlgl,
    duration: 10,
    startTime: Date.now(),
    volume: 100,
    muted: true,
    options: {eastFlower: true, redPace: Pace.Long} as RedLightGreenLightOptions
});

// State Savers and Loaders
export function saveState() {
    const state = {
        features,
        currentGame,
    };

    fs.writeFileSync(filePath, JSON.stringify(state, null, 2));
    return true;
}

// Function to load the state from a JSON file
export function loadState() {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return false;
    }

    const rawData = fs.readFileSync(filePath, 'utf8');
    const state = JSON.parse(rawData);

    features = state.features;
    currentGame = new Game(state.currentGame);
    return true
}

// API Functions

export function getFeatureState(featureName: FeatureName) {
    return features[featureName];
}

export function getAllFeatures() {
    return features;
}

export function changeFeature(featureName: FeatureName, state: FeatureState) {
    features[featureName] = state;
    saveState();

    return true
}

export function getCurrentGame() {
    return currentGame
}

export function startGame(game: Game) {
    currentGame = game
    saveState()
    return true
}

export function updateGame(game: Game) {
    currentGame = game;
    saveState()
    return true
}

export function stopGame() {
    currentGame = null
    saveState()
    return true
}

export function resetFeatures() {
    features = {}
    currentGame = null
    saveState()
    return true
}
