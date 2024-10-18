import {FeatureName} from "./types";

export function exponentialVolume(volume: number, featureName:FeatureName) {
    const volumeScalars = {
        [FeatureName.flowerTrioLeft]: [20,55], 
        [FeatureName.flowerTrioRight]: [20,55],
        [FeatureName.flowerTrioMiddle]: [20,55], 
        [FeatureName.flowerTopLeft]: [20,55],
        [FeatureName.flowerTopRight]: [20,55],
        [FeatureName.flowerSmall]: [20,55],
        [FeatureName.kalliroscope]: [20,55],
        [FeatureName.stairsEast]: [20,55],
        [FeatureName.stairsWest]: [20,55],
        [FeatureName.conductor]: [20,55],
        [FeatureName.pebbles]: [20,55]
    } as Record<FeatureName, Array<number>>
    const min = volumeScalars[featureName][0]
    const max = volumeScalars[featureName][1]

    if(volume == 0 ) return 0
    //scale volume ranges [0,100] to [min,max]
    volume = volume/(100) * (max-min) + min
    //scale it exponentially
    return (Math.pow(volume/100,0.5)) * 200
}