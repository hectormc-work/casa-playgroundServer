import fs from "fs";
import { FeatureState, Game, GameName, Pace, RedLightGreenLightOptions } from "./types";

export default class CasaState {
    private static instance: CasaState; // There will only ever be one of these State classes
    private static readonly STATE_PATH = 'state.json';
    private static readonly DEFAULT_STATE_PATH = 'state-default.json';
    private features: { [featureName: string]: FeatureState } = {};
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

    public setFeature(featureName: string, state: FeatureState) {
        this.features[featureName] = state;
        this.saveState()
    }

    // Set Features' Mode
    public setFeaturesMode(features: { [featureName: string]: FeatureState }) {
        for (const featureName in features) {
            const currentFeature = this.features[featureName];
            const newFeature = features[featureName];

            if (currentFeature) {
                currentFeature.mode = newFeature.mode;
            }
        }

        this.saveState()
    }

    public setGame(game: Game | null) {
        this.game = game;
        this.saveState()
    }

    public getFeatures() {
        return this.features;
    }

    public getFeatureState(featureName: string): FeatureState | null {
        return this.features[featureName];
    }

    public getGame() {
        return this.game;
    }

    public reset() {
        this.features = {}
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

    /**********************************************
     * Helpers
     **********************************************/

    /**
     * Get features from DEFAULT_STATE_PATH
     *
     * return {[featureName: string]: FeatureState}
     */
    public getDefaultFeatures(): { [featureName: string]: FeatureState } {
        if (!fs.existsSync(CasaState.DEFAULT_STATE_PATH)) {
            console.log(`File not found: ${CasaState.DEFAULT_STATE_PATH}`);
            return {};
        }

        const rawData = fs.readFileSync(CasaState.DEFAULT_STATE_PATH, 'utf8');
        const state = JSON.parse(rawData);

        return state.features as { [featureName: string]: FeatureState };
    }
}
