// Features

export enum Mode {
    //flower
    flowerFunky = 'flower_gtr',
    flowerOrchestra = 'flower_orch',
    flowerBeats = 'flower_init',
    flowerTarget = 'target_test',
    flowerBrash = 'bold_and_brash',
    flowerThump = 'big_thump',
    //conductor pads
    conductorThumpPad = 'thump_pads',
    //stairs
    stairsGuitar = 'Guitar_Remix',
    stairsOrchestra = 'orchestra_remix',
    stairsBeats = 'Funkybeats_Remix',
    stairsPath = 'Center_Pathway',
    stairsSpace = 'Space',
    stairsJungle = 'animalsForest',
    stairsFarm = 'farm_animals',
    stairsTrains = 'Trains',
    //kalliroscope
    stairsMusicBox = 'MusicBox',
    //pebbles
    pebblesFunky = 'funky',
    pebblesHipHop = 'hiphop',
    pebblesTrain = 'train',
    pebblesOrchestra = 'orch',
    pebblesDisabled = 'disabled',
    fountainMusicMachine = 'musicMachine',
    fountainRainbowHarp = 'rainbowHarp',
    fountainGlassy = 'glassy',
    fountainSpaceCadet = 'spaceCadet',
    fountainMonsterDrums = 'monsterDrums',
    gameRLGL = 'red_green',
    gameMonster = 'gameMonster',
    gameSpace = 'gameSpace',
}



export const GAME_MODES = [Mode.gameRLGL, Mode.gameSpace, Mode.gameMonster]

export function gameNameToGameMode(gameName: GameName) {
    let gameMode;

    if (gameName === GameName.space) {
        gameMode = Mode.stairsSpace
    } else if (gameName === GameName.monster) {
        gameMode = Mode.gameMonster
    } else {
        gameMode = Mode.gameRLGL
    }

    return gameMode
}

export enum TargetOption {
    fast = 2,
    medium = 1,
    slow = 0
}

export type FeatureState = {
    volume: number,
    muted: boolean,
    mode: Mode,
    modeOption?: TargetOption | number,
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
    pebbles = 'pebbles',
    fountain = 'fountain',
}

export type Feature = {
    name: FeatureName,
    state: FeatureState,
}

export type Features = Feature[]
export type FeaturesMap = Partial<Record<FeatureName, FeatureState>>

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

    participatingFeatureNames(){
        const features = [] as Array<FeatureName>

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

            if (options.conductorPads) { features.push(FeatureName.conductor) }
            if (options.eastFlower) { features.push(FeatureName.flowerTopLeft) }
            if (options.westFlower) { features.push(FeatureName.flowerTopRight) }
            if (options.smallFlower) { features.push(FeatureName.flowerSmall) }
            if (options.trioFlowers) {
                features.push(FeatureName.flowerTrioLeft)
                features.push(FeatureName.flowerTrioMiddle)
                features.push(FeatureName.flowerTrioRight)
            }
        }

        return features
    }

    static allPossibleFeatureNames(name: GameName){
        let features = [] as Array<FeatureName>;

        if (name === GameName.rlgl) {
            features = [
                FeatureName.flowerTopLeft,
                FeatureName.flowerTopRight,
                FeatureName.flowerSmall,
                FeatureName.flowerTrioLeft,
                FeatureName.flowerTrioMiddle,
                FeatureName.flowerTrioRight,
            ]
        } else if (name === GameName.monster) {
            features = [
                FeatureName.conductor,
                FeatureName.flowerTopLeft,
                FeatureName.flowerTopRight,
                FeatureName.flowerSmall,
                FeatureName.flowerTrioLeft,
                FeatureName.flowerTrioMiddle,
                FeatureName.flowerTrioRight,
            ]
        }

        return features
    }
}
