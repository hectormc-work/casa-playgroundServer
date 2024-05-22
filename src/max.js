"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGame = exports.getCurrentGame = exports.changeFeature = exports.getAllFeatures = exports.getFeatureState = exports.loadState = exports.saveState = void 0;
const types_1 = require("./types");
const fs = __importStar(require("fs"));
// Storing game State here to be sent out
const filePath = 'state.json';
let features = {};
let currentGame = new types_1.Game({
    name: types_1.GameName.rlgl,
    duration: 10,
    startTime: Date.now(),
    volume: 100,
    muted: true,
    options: { eastFlower: true, redPace: types_1.Pace.Long }
});
// State Savers and Loaders
function saveState() {
    const state = {
        features,
        currentGame,
    };
    fs.writeFileSync(filePath, JSON.stringify(state, null, 2));
    return true;
}
exports.saveState = saveState;
// Function to load the state from a JSON file
function loadState() {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return false;
    }
    const rawData = fs.readFileSync(filePath, 'utf8');
    const state = JSON.parse(rawData);
    features = state.features;
    currentGame = new types_1.Game(state.currentGame);
    return true;
}
exports.loadState = loadState;
// API Functions
function getFeatureState(featureName) {
    return features[featureName];
}
exports.getFeatureState = getFeatureState;
function getAllFeatures() {
    return features;
}
exports.getAllFeatures = getAllFeatures;
function changeFeature(featureName, state) {
    features[featureName] = state;
    saveState();
    return true;
}
exports.changeFeature = changeFeature;
function getCurrentGame() {
    return currentGame;
}
exports.getCurrentGame = getCurrentGame;
function startGame(game) {
    currentGame = game;
    saveState();
    return true;
}
exports.startGame = startGame;
