"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exponentialVolume = void 0;
function exponentialVolume(volume) {
    return Math.pow(volume / 100, 0.5) * 200;
}
exports.exponentialVolume = exponentialVolume;
