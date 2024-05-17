"use strict";
// Features
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pace = exports.GameName = exports.FeatureName = exports.TargetOption = exports.Mode = void 0;
var Mode;
(function (Mode) {
    Mode["funky"] = "Funky";
    Mode["orchestra"] = "Orchestra";
    Mode["beats"] = "Beats";
    Mode["target"] = "Target";
    Mode["brash"] = "Brash";
    Mode["thump"] = "Thump";
    Mode["musicBox"] = "Music Box";
    Mode["path"] = "Path";
    Mode["space"] = "Space";
    Mode["jungle"] = "Jungle";
    Mode["farm"] = "Farm";
    Mode["trains"] = "Trains";
})(Mode || (exports.Mode = Mode = {}));
var TargetOption;
(function (TargetOption) {
    TargetOption["fast"] = "Fast";
    TargetOption["medium"] = "Medium";
    TargetOption["slow"] = "Slow";
})(TargetOption || (exports.TargetOption = TargetOption = {}));
var FeatureName;
(function (FeatureName) {
    FeatureName["flowerTrioLeft"] = "flowerTrioLeft";
    FeatureName["flowerTrioRight"] = "flowerTrioRight";
    FeatureName["flowerTrioMiddle"] = "flowerTrioMiddle";
    FeatureName["flowerTopLeft"] = "flowerTopLeft";
    FeatureName["flowerTopRight"] = "flowerTopRight";
    FeatureName["flowerBottomLeft"] = "flowerBottomLeft";
    FeatureName["kalliroscope"] = "kalliroscope";
    FeatureName["eastStairs"] = "eastStairs";
    FeatureName["westStairs"] = "westStairs";
    FeatureName["conductor"] = "conductor";
})(FeatureName || (exports.FeatureName = FeatureName = {}));
// Games
var GameName;
(function (GameName) {
    GameName["rlgl"] = "Red Light, Green Light";
    GameName["monster"] = "Baby Monsters";
})(GameName || (exports.GameName = GameName = {}));
var Pace;
(function (Pace) {
    Pace["Mixed"] = "Mixed";
    Pace["Short"] = "Short";
    Pace["Medium"] = "Medium";
    Pace["Long"] = "Long";
})(Pace || (exports.Pace = Pace = {}));
