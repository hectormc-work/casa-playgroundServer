// Features

export enum Mode {
    //flower
    funky = 'flower_gtr',
    orchestra = 'flower_orch',
    beats = 'flower_init',
    target = 'target_test',
    brash = 'bold_and_brash',
    thump = 'big_thump',
    rlgl = 'red_green',
    //conductor pads
    thumpPad = 'thump_pads',
    // flower and conductor
    monster = 'monster',
    //stairs
    guitar = 'Guitar_Remix',
    orchestraStairs = 'orchestra_remix',
    beatsStairs = 'Funkybeats_Remix',
    path = 'Center_Pathway',
    space = 'Space',
    jungle = 'animalsForest',
    farm = 'farm_animals',
    trains = 'Trains',
    //kalliroscope
    musicBox = 'MusicBox',
    //pebbles
    pebblesFunky = 'funky',
    pebblesHipHop = 'hiphop',
    pebblesTrain = 'train',
    pebblesOrchestra = 'orch'
}

export enum TargetOption {
    fast = 'Fast',
    medium = 'Medium',
    slow = 'Slow'
}

export type FeatureState = {
    volume: number,
    muted: boolean,
    mode: Mode,
    modeOption?: TargetOption | number,
    enabled?: boolean
}

export enum FeatureName {
    flowerTrioLeft = 'flowerC',
    flowerTrioRight = 'flowerE',
    flowerTrioMiddle = 'flowerD',
    flowerTopLeft = 'flowerB',
    flowerTopRight = 'flowerA',
    flowerSmall = 'flowerF',
    kalliroscope = 'kalliroscope',
    stairsEast = 'stairsA',
    stairsWest = 'stairsB',
    conductor = 'pads',
    pebbles = 'pebbles'
}

export type Feature = {
    name: FeatureName,
    state: FeatureState,
}

// Games

export enum GameName {
    rlgl = 'Red Light, Green Light',
    monster = 'Baby Monsters',
    space = 'Space'
}

export enum RLGLColors {
    red = 'red',
    green = 'green'
}

export enum Pace {
    Mixed = 'Mixed',
    Short = 'Short',
    Medium = 'Medium',
    Long = 'Long',
}

export type RedLightGreenLightOptions = {
    redPace: Pace,
    greenPace: Pace,
    eastFlower: boolean,
    westFlower: boolean,
    trioFlowers: boolean,
    smallFlower: boolean,
}

export type BabyMonstersOptions = {
    hiddenMonsters: number,
    carryingCapacity: number,
    eastFlower: boolean,
    westFlower: boolean,
    trioFlowers: boolean,
    smallFlower: boolean,
    conductorPads: boolean
}

export interface GameJSON {
    name: GameName;
    duration: number;
    startTime: number;
    volume: number;
    muted: boolean;
    options: RedLightGreenLightOptions | BabyMonstersOptions;
}

export class Game {
    name: GameName;
    duration: number;
    startTime: number;
    volume: number;
    muted: boolean;
    options: RedLightGreenLightOptions | BabyMonstersOptions;

    constructor(gameObject: GameJSON) {
        this.validateGameObject(gameObject);

        this.name = gameObject.name;
        this.duration = gameObject.duration;
        this.startTime = gameObject.startTime;
        this.volume = gameObject.volume;
        this.muted = gameObject.muted;
        this.options = gameObject.options;
    }

    validateGameObject(gameObject: GameJSON) {
        for (const [key, value] of Object.entries(gameObject)) {
            if (value === null || value === undefined) {
                throw new Error(`The field ${key} is required and cannot be empty.`);
            }
        }
    }

    isOngoing() {
        if (this.startTime && this.duration) {
            return Date.now() < (this.startTime + this.duration);
        }
        return false;
    }

    participatingFeatures(){
        const features = [] as Array<FeatureName>
        if (!this.isOngoing()) {
            return features
        }

        if (this.name === GameName.rlgl) {
            const options = this.options as RedLightGreenLightOptions
            if (options.eastFlower) { features.push(FeatureName.flowerTopLeft) }
            if (options.westFlower) { features.push(FeatureName.flowerTopRight) }
            if (options.smallFlower) { features.push(FeatureName.flowerSmall) }
            if (options.trioFlowers) {
                features.push(FeatureName.flowerTrioLeft)
                features.push(FeatureName.flowerTrioMiddle)
                features.push(FeatureName.flowerTrioRight)
            }
        } else if (this.name === GameName.monster) {
            const options = this.options as BabyMonstersOptions
            features.push(FeatureName.kalliroscope)
        }

        return features
    }
}
