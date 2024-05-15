export enum Pace {
    Mixed = 'Mixed',
    Short = 'Short',
    Medium = 'Medium',
    Long = 'Long',
}

export type FeatureState = {
    volume?: number,
    muted?: boolean,
    option?: string, // Which of the Thump, Beats, etc. is currently active
    subOption?: string // Flower’s Target: slow medium fast
}

export type Feature = {
    name: string, // Unique Feature Identifier ( like trio-flower East)
    state: FeatureState, // State object from above
}


// Red Light, Green Light State
export type RedLightGreenLightState = {
    ongoing: boolean,
    redPace?: Pace,
    greenPace?: Pace,
    duration?: number,
    eastFlower?: boolean,
    westFlower?: boolean,
    trioFlowers?: boolean,
    smallFlower?: boolean,
    volume?: number,
    muted?: boolean,
    timeLeft?: number, // in ms, how much time is left in the game
}

export type BabyMonstersState = {
    ongoing: boolean,
    numberOfMonsters?: number,
}

export enum Games {
    rlgl = 'Red Light, Green Light',
    monster = 'Baby Monsters',
}

export type Game = {
    name: Games,
    state: RedLightGreenLightState | BabyMonstersState
}
