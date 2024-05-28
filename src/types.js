"use strict";
// Features
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.Pace = exports.GameName = exports.FeatureName = exports.TargetOption = exports.Mode = void 0;
var Mode;
(function (Mode) {
    //flower
    Mode["funky"] = "flower_gtr";
    Mode["orchestra"] = "flower_orch";
    Mode["beats"] = "flower_init";
    Mode["target"] = "target_test";
    Mode["brash"] = "bold_and_brash";
    Mode["thump"] = "big_thump";
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
    FeatureName["flowerTrioRight"] = "flowerD";
    FeatureName["flowerTrioMiddle"] = "flowerE";
    FeatureName["flowerTopLeft"] = "flowerB";
    FeatureName["flowerTopRight"] = "flowerA";
    FeatureName["flowerSmall"] = "flowerF";
    FeatureName["kalliroscope"] = "kalliroscope";
    FeatureName["stairsEast"] = "eastStairs";
    FeatureName["stairsWest"] = "westStairs";
    FeatureName["conductor"] = "conductor";
})(FeatureName || (exports.FeatureName = FeatureName = {}));
// Games
var GameName;
(function (GameName) {
    GameName["rlgl"] = "Red Light, Green Light";
    GameName["monster"] = "Baby Monsters";
    GameName["space"] = "Space";
})(GameName || (exports.GameName = GameName = {}));
var Pace;
(function (Pace) {
    Pace["Mixed"] = "Mixed";
    Pace["Short"] = "Short";
    Pace["Medium"] = "Medium";
    Pace["Long"] = "Long";
})(Pace || (exports.Pace = Pace = {}));
class Game {
    constructor(gameObject) {
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
exports.Game = Game;
