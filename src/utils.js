"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exponentialVolume = void 0;
const types_1 = require("./types");
function exponentialVolume(volume, featureName) {
    const volumeScalars = {
        [types_1.FeatureName.flowerTrioLeft]: [20, 55],
        [types_1.FeatureName.flowerTrioRight]: [20, 55],
        [types_1.FeatureName.flowerTrioMiddle]: [20, 55],
        [types_1.FeatureName.flowerTopLeft]: [20, 55],
        [types_1.FeatureName.flowerTopRight]: [20, 55],
        [types_1.FeatureName.flowerSmall]: [20, 55],
        [types_1.FeatureName.kalliroscope]: [20, 55],
        [types_1.FeatureName.stairsEast]: [20, 55],
        [types_1.FeatureName.stairsWest]: [20, 55],
        [types_1.FeatureName.conductor]: [20, 55],
        [types_1.FeatureName.pebbles]: [20, 55]
    };
    const min = volumeScalars[featureName][0];
    const max = volumeScalars[featureName][1];
    if (volume == 0)
        return 0;
    //scale volume ranges [0,100] to [min,max]
    volume = volume / (100) * (max - min) + min;
    //scale it exponentially
    return (Math.pow(volume / 100, 0.5)) * 200;
}
exports.exponentialVolume = exponentialVolume;
