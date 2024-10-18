"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const types_1 = require("./types");
class CasaState {
    /**********************************************
     * Constructor
     **********************************************/
    constructor() {
        this.features = {};
        this.game = new types_1.Game({
            name: types_1.GameName.rlgl,
            duration: 10,
            startTime: Date.now(),
            volume: 100,
            muted: true,
            options: { eastFlower: true, redPace: types_1.Pace.Long }
        });
        this.loadState();
        if (!fs_1.default.existsSync(CasaState.DEFAULT_STATE_PATH)) {
            console.log(`File not found: ${CasaState.DEFAULT_STATE_PATH}`);
            this.defaultFeatures = {};
        }
        else {
            console.log('Loaded state-default.json');
            const rawData = fs_1.default.readFileSync(CasaState.DEFAULT_STATE_PATH, 'utf8');
            const state = JSON.parse(rawData);
            this.defaultFeatures = state.features;
        }
    }
    // Static method to get the single instance of the class
    static getInstance() {
        if (!CasaState.instance) {
            CasaState.instance = new CasaState();
        }
        return CasaState.instance;
    }
    /**********************************************
     * Set, Get
     **********************************************/
    setFeatures(features) {
        this.features = features;
        this.saveState();
    }
    setFeature(featureName, state) {
        this.features[featureName] = state;
        this.saveState();
    }
    setFeatureMode(featureName, mode) {
        const featureState = this.getFeatureState(featureName);
        if (featureState) {
            featureState.mode = mode;
        }
    }
    // Set Features' Mode
    setFeaturesMode(features) {
        for (const name in features) {
            const featureName = name;
            const featureState = this.features[featureName];
            this.setFeatureMode(featureName, featureState.mode);
        }
        this.saveState();
    }
    setGame(game) {
        if (this.game !== game) {
            this.updateFeaturesGameStatus(this.game, game);
        }
        this.game = game;
        this.saveState();
    }
    updateFeaturesGameStatus(oldGame, newGame) {
        const oldFeatures = (oldGame !== null) ? oldGame.participatingFeatureNames() : [];
        const newFeatures = (newGame !== null) ? newGame.participatingFeatureNames() : [];
        if (newGame !== null) {
            newFeatures.forEach((featureName) => {
                this.setFeatureMode(featureName, (0, types_1.gameNameToGameMode)(newGame.name));
            });
        }
        // Features not in newFeatures (and thus didn't just get set by above)
        const leftOutFeatures = oldFeatures.filter((featureName) => { return !newFeatures.includes(featureName); });
        leftOutFeatures.forEach((featureName) => {
            this.restoreFeatureToDefaultState(featureName);
        });
    }
    getFeatures() {
        return Object.keys(this.features).map(name => {
            const featureName = name;
            return { name, state: this.features[featureName] };
        });
    }
    getFeaturesMap() {
        return JSON.parse(JSON.stringify(this.features));
    }
    getFeatureState(featureName) {
        return this.features[featureName];
    }
    getGame() {
        return this.game;
    }
    reset() {
        this.features = this.getDefaultFeatures();
        this.game = null;
        this.saveState();
    }
    /**********************************************
     * Save, Load
     **********************************************/
    saveState() {
        const state = {
            features: this.features,
            currentGame: this.game,
        };
        fs_1.default.writeFileSync(CasaState.STATE_PATH, JSON.stringify(state, null, 2));
    }
    /**
     * Load state.json as game and features
     */
    loadState() {
        if (!fs_1.default.existsSync(CasaState.STATE_PATH)) {
            console.log(`File not found: ${CasaState.STATE_PATH}`);
            return false;
        }
        const rawData = fs_1.default.readFileSync(CasaState.STATE_PATH, 'utf8');
        const state = JSON.parse(rawData);
        this.features = state.features;
        if (state.game) {
            this.game = new types_1.Game(state.game);
        }
        else {
            this.game = null;
        }
        console.log('loaded state.json');
        return true;
    }
    /**********************************************
     * Load Default States
     **********************************************/
    /**
     * Load state-default.json and set as current state
     *
     * Use case: after wake-up
     */
    restoreDefaultState() {
        this.features = this.getDefaultFeatures();
        this.game = null;
        this.saveState();
    }
    restoreFeatureToDefaultState(featureName) {
        this.features[featureName] = this.getDefaultFeatures()[featureName];
    }
    /**********************************************
     * Helpers
     **********************************************/
    /**
     * Get features from DEFAULT_STATE_PATH
     *
     * return {[featureName: string]: FeatureState}
     */
    getDefaultFeatures() {
        return JSON.parse(JSON.stringify(this.defaultFeatures));
    }
    isInGame(featureName) {
        const featureState = this.features[featureName];
        if (!featureState) {
            return false;
        }
        return types_1.GAME_MODES.includes(featureState.mode);
    }
}
CasaState.STATE_PATH = 'state.json';
CasaState.DEFAULT_STATE_PATH = 'state-default.json';
exports.default = CasaState;
