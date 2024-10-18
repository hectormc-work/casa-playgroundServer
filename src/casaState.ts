import fs from "fs";
import {
    Feature,
    FeatureName,
    FeaturesMap,
    FeatureState,
    Game, GAME_MODES,
    GameName, gameNameToGameMode,
    Mode,
    Pace,
    RedLightGreenLightOptions,
} from "./types";

export default class CasaState {
    private static instance: CasaState; // There will only ever be one of these State classes
    private static readonly STATE_PATH = 'state.json';
    private static readonly DEFAULT_STATE_PATH = 'state-default.json';
    private features: FeaturesMap = {};
    private readonly defaultFeatures: FeaturesMap;
    private game: Game | null = new Game({
        name: GameName.rlgl,
        duration: 10,
        startTime: Date.now(),
        volume: 100,
        muted: true,
        options: { eastFlower: true, redPace: Pace.Long } as RedLightGreenLightOptions
    });

    /**********************************************
     * Constructor
     **********************************************/

    private constructor() {
        this.loadState()

        if (!fs.existsSync(CasaState.DEFAULT_STATE_PATH)) {
            console.log(`File not found: ${CasaState.DEFAULT_STATE_PATH}`);
            this.defaultFeatures = {}
        } else {
            console.log('Loaded state-default.json')
            const rawData = fs.readFileSync(CasaState.DEFAULT_STATE_PATH, 'utf8');
            const state = JSON.parse(rawData);

            this.defaultFeatures = state.features;
        }


    }

    // Static method to get the single instance of the class
    public static getInstance(): CasaState {
        if (!CasaState.instance) {
            CasaState.instance = new CasaState();
        }
        return CasaState.instance;
    }

    /**********************************************
     * Set, Get
     **********************************************/

    public setFeatures(features: { [featureName: string]: FeatureState }) {
        this.features = features;
        this.saveState()
    }

    public setFeature(featureName: FeatureName, state: FeatureState) {
        this.features[featureName] = state;
        this.saveState()
    }

    public setFeatureMode(featureName: FeatureName, mode: Mode) {
        const featureState = this.getFeatureState(featureName);
        if (featureState) {
            featureState.mode = mode
        }
    }

    // Set Features' Mode
    public setFeaturesMode(features: FeaturesMap) {
        for (const name in features) {
            const featureName = name as FeatureName;
            const featureState = this.features[featureName] as FeatureState;
            this.setFeatureMode(featureName, featureState.mode);
        }

        this.saveState()
    }

    public setGame(game: Game | null) {
        if (this.game !== game) {
            this.updateFeaturesGameStatus(this.game, game)
        }
        this.game = game;
        this.saveState()
    }

    private updateFeaturesGameStatus(oldGame: Game|null, newGame: Game|null) {
        const oldFeatures = (oldGame !== null) ? oldGame.participatingFeatureNames() : []
        const newFeatures = (newGame !== null) ? newGame.participatingFeatureNames() : []

        if (newGame !== null) {
            newFeatures.forEach((featureName) => {
                this.setFeatureMode(featureName, gameNameToGameMode(newGame.name))
            })
        }

        // Features not in newFeatures (and thus didn't just get set by above)
        const leftOutFeatures = oldFeatures.filter((featureName) => {return !newFeatures.includes(featureName)})
        leftOutFeatures.forEach((featureName) => {
            this.restoreFeatureToDefaultState(featureName)
        })
    }

    public getFeatures() {
        return Object.keys(this.features).map(name => {
            const featureName = name as FeatureName;
            return {name, state: this.features[featureName]} as Feature
        });
    }

    public getFeatureState(featureName: FeatureName): FeatureState | undefined {
        return this.features[featureName];
    }

    public getGame() {
        return this.game;
    }

    public reset() {
        this.features = this.getDefaultFeatures()
        this.game = null
        this.saveState()
    }


    /**********************************************
     * Save, Load
     **********************************************/
    private saveState() {
        const state = {
            features: this.features,
            currentGame: this.game,
        };

        fs.writeFileSync(CasaState.STATE_PATH, JSON.stringify(state, null, 2));
    }

    /**
     * Load state.json as game and features
     */
    private loadState(): boolean {
        if (!fs.existsSync(CasaState.STATE_PATH)) {
            console.log(`File not found: ${CasaState.STATE_PATH}`);
            return false;
        }

        const rawData = fs.readFileSync(CasaState.STATE_PATH, 'utf8');
        const state = JSON.parse(rawData);

        this.features = state.features;

        if (state.game) {
            this.game = new Game(state.game);
        } else {
            this.game = null;
        }

        console.log('loaded state.json')
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
    public restoreDefaultState(): void {
        this.features = this.getDefaultFeatures();
        this.game = null;
        this.saveState();
    }

    public restoreFeatureToDefaultState(featureName: FeatureName) {
        this.features[featureName] = this.getDefaultFeatures()[featureName]
    }

    /**********************************************
     * Helpers
     **********************************************/

    /**
     * Get features from DEFAULT_STATE_PATH
     *
     * return {[featureName: string]: FeatureState}
     */
    public getDefaultFeatures(): FeaturesMap {
        return JSON.parse(JSON.stringify(this.defaultFeatures));
    }

    private isInGame(featureName: FeatureName): boolean {
        const featureState = this.features[featureName];
        if (!featureState) {
            return false
        }

        return GAME_MODES.includes(featureState.mode)
    }
}
