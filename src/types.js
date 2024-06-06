"use strict";
// Features
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.Pace = exports.RLGLColors = exports.GameName = exports.FeatureName = exports.TargetOption = exports.Mode = void 0;
var Mode;
(function (Mode) {
    //flower
    Mode["funky"] = "flower_gtr";
    Mode["orchestra"] = "flower_orch";
    Mode["beats"] = "flower_init";
    Mode["target"] = "target_test";
    Mode["brash"] = "bold_and_brash";
    Mode["thump"] = "big_thump";
    Mode["rlgl"] = "red_green";
    //conductor pads
    Mode["thumpPad"] = "thump_pads";
    // flower and conductor
    Mode["monster"] = "monster";
    //stairs
    Mode["guitar"] = "Guitar_Remix";
    Mode["orchestraStairs"] = "orchestra_remix";
    Mode["beatsStairs"] = "Funkybeats_Remix";
    Mode["path"] = "Center_Pathway";
    Mode["space"] = "Space";
    Mode["jungle"] = "animalsForest";
    Mode["farm"] = "farm_animals";
    Mode["trains"] = "Trains";
    //kalliroscope
    Mode["musicBox"] = "Music Box";
})(Mode || (exports.Mode = Mode = {}));
var TargetOption;
(function (TargetOption) {
    TargetOption["fast"] = "Fast";
    TargetOption["medium"] = "Medium";
    TargetOption["slow"] = "Slow";
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
}
exports.Game = Game;
