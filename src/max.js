"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGame = exports.getCurrentGame = exports.changeFeature = exports.getAllFeatures = exports.getFeatureState = void 0;
const types_1 = require("./types");
// Storing game State here to be sent out
let features = [];
let currentGame = { name: types_1.Games.rlgl, state: { ongoing: false } };
function getFeatureState(featureName) {
    // Query max patch
    return {};
}
exports.getFeatureState = getFeatureState;
function getAllFeatures() {
    return [];
}
exports.getAllFeatures = getAllFeatures;
function changeFeature(state) {
    // Logic to change feature
    return {}; // true if change went through, else false
}
exports.changeFeature = changeFeature;
function getCurrentGame() {
    return {};
}
exports.getCurrentGame = getCurrentGame;
function startGame(state) {
    // logic to start game
    return {}; // if game started properly
}
exports.startGame = startGame;
