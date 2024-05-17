"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGame = exports.getCurrentGame = exports.changeFeature = exports.getAllFeatures = exports.getFeatureState = void 0;
const types_1 = require("./types");
// Storing game State here to be sent out
let features = {};
let currentGame = { name: types_1.GameName.rlgl, state: { ongoing: true } };
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
    return true;
}
exports.changeFeature = changeFeature;
function getCurrentGame() {
    return currentGame;
}
exports.getCurrentGame = getCurrentGame;
function startGame(game) {
    currentGame = game;
    return true;
}
exports.startGame = startGame;
