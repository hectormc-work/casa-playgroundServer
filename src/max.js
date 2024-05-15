"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGame = exports.getCurrentGame = exports.changeFeature = exports.getAllFeatures = exports.getFeature = void 0;
function getFeature(featureName) {
    return {};
}
exports.getFeature = getFeature;
function getAllFeatures() {
    return [];
}
exports.getAllFeatures = getAllFeatures;
function changeFeature(state) {
    // Logic to change feature
    return true; // true if change went through, else false
}
exports.changeFeature = changeFeature;
function getCurrentGame() {
    return {};
}
exports.getCurrentGame = getCurrentGame;
function startGame(state) {
    // logic to start game
    return true; // if game started properly
}
exports.startGame = startGame;
