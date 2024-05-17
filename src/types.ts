// Features

export enum Mode {
    funky = 'Funky',
    orchestra = 'Orchestra',
    beats = 'Beats',
    target = 'Target',
    brash = 'Brash',
    thump = 'Thump',
    musicBox = 'Music Box',
    path = 'Path',
    space = 'Space',
    jungle = 'Jungle',
    farm = 'Farm',
    trains = 'Trains'
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
    flowerTrioLeft = 'flowerTrioLeft',
    flowerTrioRight = 'flowerTrioRight',
    flowerTrioMiddle = 'flowerTrioMiddle',
    flowerTopLeft = 'flowerTopLeft',
    flowerTopRight = 'flowerTopRight',
    flowerBottomLeft = 'flowerBottomLeft',
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

export type RedLightGreenLightState = {
    redPace?: Pace,
    greenPace?: Pace,
    duration?: number,
    ongoing?: boolean,
    eastFlower?: boolean,
    westFlower?: boolean,
    trioFlowers?: boolean,
    smallFlower?: boolean,
    volume?: number,
    muted?: boolean,
}

export type BabyMonstersState = {
    ongoing: boolean,
    numberOfMonsters?: number,
}

export type Game = {
    name: GameName,
    state: RedLightGreenLightState | BabyMonstersState,
}
