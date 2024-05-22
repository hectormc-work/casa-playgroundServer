// Features

export enum Mode {
    //flower
    funky = 'flower_gtr',
    orchestra = 'flower_orch',
    beats = 'flower_init',
    target = 'target_test',
    brash = 'bold_and_brash',
    thump = 'big_thump',
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
    musicBox = 'Music Box',
    //games
    monster = 'Monster'
}

export enum TargetOption {
    fast = 'Fast',
    medium = 'Medium',
    slow = 'Slow'
}

export type FeatureState = {
    volume?: number,
    muted?: boolean,
    mode?: Mode,
    modeOption?: TargetOption
}

export enum FeatureName {
    flowerTrioLeft = 'flowerC',
    flowerTrioRight = 'flowerD',
    flowerTrioMiddle = 'flowerE',
    flowerWest = 'flowerB',
    flowerEast = 'flowerA',
    flowerSmall = 'flowerF',
    kalliroscope = 'kalliroscope',
    eastStairs = 'eastStairs',
    westStairs = 'westStairs',
    conductor = 'conductor',
}

export type Feature = {
    name: FeatureName,
    state: FeatureState,
}

// Games

export enum GameName {
    rlgl = 'Red Light, Green Light',
    monster = 'Baby Monsters',
}

export enum Pace {
    Mixed = 'Mixed',
    Short = 'Short',
    Medium = 'Medium',
    Long = 'Long',
}

export type RedLightGreenLightOptions = {
    redPace?: Pace,
    greenPace?: Pace,
    eastFlower?: boolean,
    westFlower?: boolean,
    trioFlowers?: boolean,
    smallFlower?: boolean,
}

export type BabyMonstersOptions = {
    numberOfMonsters?: number,
}

interface GameJSON {
    name?: GameName;
    duration?: number;
    startTime?: number;
    volume?: number;
    muted?: boolean;
    options?: RedLightGreenLightOptions | BabyMonstersOptions;
}

export class Game {
    name?: GameName;
    duration?: number;
    startTime?: number;
    volume?: number;
    muted?: boolean;
    options?: RedLightGreenLightOptions | BabyMonstersOptions;

    constructor(gameObject: GameJSON) {
        this.name = gameObject.name;
        this.duration = gameObject.duration;
        this.startTime = gameObject.startTime;
        this.volume = gameObject.volume;
        this.muted = gameObject.muted;
        this.options = gameObject.options;
    }

    isOngoing() {
        if (this.startTime && this.duration) {
            return Date.now() < (this.startTime + this.duration);
        }
        return false;
    }
}
