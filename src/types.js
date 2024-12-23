"use strict";
// Features
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.Pace = exports.RLGLColors = exports.GameName = exports.FeatureName = exports.TargetOption = exports.gameNameToGameMode = exports.GAME_MODES = exports.Mode = void 0;
var Mode;
(function (Mode) {
    //flower
    Mode["flowerFunky"] = "flower_gtr";
    Mode["flowerOrchestra"] = "flower_orch";
    Mode["flowerBeats"] = "flower_init";
    Mode["flowerTarget"] = "target_test";
    Mode["flowerBrash"] = "bold_and_brash";
    Mode["flowerThump"] = "big_thump";
    //conductor pads
    Mode["conductorThumpPad"] = "thump_pads";
    //stairs
    Mode["stairsGuitar"] = "Guitar_Remix";
    Mode["stairsOrchestra"] = "orchestra_remix";
    Mode["stairsBeats"] = "Funkybeats_Remix";
    Mode["stairsPath"] = "Center_Pathway";
    Mode["stairsSpace"] = "Space";
    Mode["stairsJungle"] = "animalsForest";
    Mode["stairsFarm"] = "farm_animals";
    Mode["stairsTrains"] = "Trains";
    //kalliroscope
    Mode["stairsMusicBox"] = "MusicBox";
    //pebbles
    Mode["pebblesFunky"] = "funky";
    Mode["pebblesHipHop"] = "hiphop";
    Mode["pebblesTrain"] = "train";
    Mode["pebblesOrchestra"] = "orch";
    Mode["pebblesDisabled"] = "disabled";
    Mode["fountainMusicMachine"] = "musicMachine";
    Mode["fountainRainbowHarp"] = "rainbowHarp";
    Mode["fountainGlassy"] = "glassy";
    Mode["fountainSpaceCadet"] = "spaceCadet";
    Mode["fountainMonsterDrums"] = "monsterDrums";
    Mode["gameRLGL"] = "red_green";
    Mode["gameMonster"] = "gameMonster";
    Mode["gameSpace"] = "gameSpace";
})(Mode || (exports.Mode = Mode = {}));
exports.GAME_MODES = [Mode.gameRLGL, Mode.gameSpace, Mode.gameMonster];
function gameNameToGameMode(gameName) {
    let gameMode;
    if (gameName === GameName.space) {
        gameMode = Mode.stairsSpace;
    }
    else if (gameName === GameName.monster) {
        gameMode = Mode.gameMonster;
    }
    else {
        gameMode = Mode.gameRLGL;
    }
    return gameMode;
}
exports.gameNameToGameMode = gameNameToGameMode;
var TargetOption;
(function (TargetOption) {
    TargetOption[TargetOption["fast"] = 2] = "fast";
    TargetOption[TargetOption["medium"] = 1] = "medium";
    TargetOption[TargetOption["slow"] = 0] = "slow";
})(TargetOption || (exports.TargetOption = TargetOption = {}));
var FeatureName;
(function (FeatureName) {
    FeatureName["flowerTrioLeft"] = "flowerC";
    FeatureName["flowerTrioRight"] = "flowerE";
    FeatureName["flowerTrioMiddle"] = "flowerD";
    FeatureName["flowerTopLeft"] = "flowerB";
    FeatureName["flowerTopRight"] = "flowerA";
    FeatureName["flowerSmall"] = "flowerF";
    FeatureName["kalliroscope"] = "kalliroscope";
    FeatureName["stairsEast"] = "stairsA";
    FeatureName["stairsWest"] = "stairsB";
    FeatureName["conductor"] = "pads";
    FeatureName["pebbles"] = "pebbles";
    FeatureName["fountain"] = "fountain";
})(FeatureName || (exports.FeatureName = FeatureName = {}));
// Games
var GameName;
(function (GameName) {
    GameName["rlgl"] = "Red Light, Green Light";
    GameName["monster"] = "Baby Monsters";
    GameName["space"] = "Space";
})(GameName || (exports.GameName = GameName = {}));
var RLGLColors;
(function (RLGLColors) {
    RLGLColors["red"] = "red";
    RLGLColors["green"] = "green";
})(RLGLColors || (exports.RLGLColors = RLGLColors = {}));
var Pace;
(function (Pace) {
    Pace["Mixed"] = "Mixed";
    Pace["Short"] = "Short";
    Pace["Medium"] = "Medium";
    Pace["Long"] = "Long";
})(Pace || (exports.Pace = Pace = {}));
class Game {
    constructor(gameObject) {
        this.validateGameObject(gameObject);
        this.name = gameObject.name;
        this.duration = gameObject.duration;
        this.startTime = gameObject.startTime;
        this.volume = gameObject.volume;
        this.muted = gameObject.muted;
        this.options = gameObject.options;
    }
    validateGameObject(gameObject) {
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
    participatingFeatureNames() {
        const features = [];
        if (this.name === GameName.rlgl) {
            const options = this.options;
            if (options.eastFlower) {
                features.push(FeatureName.flowerTopLeft);
            }
            if (options.westFlower) {
                features.push(FeatureName.flowerTopRight);
            }
            if (options.smallFlower) {
                features.push(FeatureName.flowerSmall);
            }
            if (options.trioFlowers) {
                features.push(FeatureName.flowerTrioLeft);
                features.push(FeatureName.flowerTrioMiddle);
                features.push(FeatureName.flowerTrioRight);
            }
        }
        else if (this.name === GameName.monster) {
            const options = this.options;
            features.push(FeatureName.kalliroscope);
            if (options.conductorPads) {
                features.push(FeatureName.conductor);
            }
            if (options.eastFlower) {
                features.push(FeatureName.flowerTopLeft);
            }
            if (options.westFlower) {
                features.push(FeatureName.flowerTopRight);
            }
            if (options.smallFlower) {
                features.push(FeatureName.flowerSmall);
            }
            if (options.trioFlowers) {
                features.push(FeatureName.flowerTrioLeft);
                features.push(FeatureName.flowerTrioMiddle);
                features.push(FeatureName.flowerTrioRight);
            }
        }
        return features;
    }
    static allPossibleFeatureNames(name) {
        let features = [];
        if (name === GameName.rlgl) {
            features = [
                FeatureName.flowerTopLeft,
                FeatureName.flowerTopRight,
                FeatureName.flowerSmall,
                FeatureName.flowerTrioLeft,
                FeatureName.flowerTrioMiddle,
                FeatureName.flowerTrioRight,
            ];
        }
        else if (name === GameName.monster) {
            features = [
                FeatureName.conductor,
                FeatureName.flowerTopLeft,
                FeatureName.flowerTopRight,
                FeatureName.flowerSmall,
                FeatureName.flowerTrioLeft,
                FeatureName.flowerTrioMiddle,
                FeatureName.flowerTrioRight,
            ];
        }
        return features;
    }
}
exports.Game = Game;
