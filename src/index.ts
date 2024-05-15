import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

export enum Pace {
    Mixed = 'Mixed',
    Short = 'Short',
    Medium = 'Medium',
    Long = 'Long',
}

export enum Games {
    rlgl = 'Red Light, Green Light',
}

// Red Light, Green Light State
export type RedLightGreenLightState = {
    ongoing: boolean,
    name: Games,
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

// Storing game State here to be sent out
const features: Feature[] = [];
let currentGame: RedLightGreenLightState = {ongoing: false, name: Games.rlgl};

// Middleware for error handling
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
}


/**
 * Sends a 'Hello, world' message.
 *
 * @name GET /
 *
 * @return {string} - Welcome message
 *
 * @throws {500} - Server error
 */
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world! Is this going through?');
});

/**
 * Change a feature's state to state given in req.body
 *
 * @name POST /features/:featureName
 *
 * @param {string} featureName - Name of the feature
 * @param {FeatureState} body - The new state for the feature
 * @return {object} - Success message with updated feature name and state
 *
 * @throws {400} - Bad request if validation fails
 * @throws {500} - Server error
 */
app.post('/features/:featureName', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { featureName } = req.params;
        const state: FeatureState = req.body;

        // TODO: Validate and apply the new state to the specified feature
        console.log(`Received settings for feature ${featureName}:`, state);

        res.status(202).send({ message: 'Feature settings updated', featureName, state });
    } catch (error) {
        next(error);
    }
});

/**
 * Get the state of ALL features in body
 *
 * @name GET /features
 *
 * @return {object} - All playground states
 *
 * @throws {500} - Server error
 */
app.get('/features', (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: Retrieve and return all playground states
        res.send({ playgroundStates: features });
    } catch (error) {
        next(error);
    }
});

/**
 * Get the state of a specific feature in body
 *
 * @name GET /features/:name
 *
 * @param {string} name - Name of the feature
 * @return {Feature} - The state of the specified feature
 *
 * @throws {404} - Feature not found
 * @throws {500} - Server error
 */
app.get('/features/:name', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.params;

        // TODO: Retrieve and return the state of the specified feature
        const featureState = features.find(state => state.name === name);
        if (featureState) {
            res.send(featureState);
        } else {
            res.status(404).send({ message: 'Feature not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * Start a global game
 *
 * @name POST /games/:gameName
 *
 * @param {string} gameName - Name of the game
 * @param {RedLightGreenLightState} body - The settings for the game
 * @return {object} - Success message with game name and settings
 *
 * @throws {400} - Bad request if validation fails
 * @throws {500} - Server error
 */
app.post('/games/:gameName', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { gameName } = req.params;
        const settings: RedLightGreenLightState = req.body;

        // TODO: Start the specified game with the provided settings
        console.log(`Starting game ${gameName} with settings:`, settings);

        res.status(202).send({ message: 'Game started', gameName, settings });
    } catch (error) {
        next(error);
    }
});

/**
 * Get the state of the current game
 *
 * @name GET /games
 *
 * @return {object} - The current game state or a message indicating no game is running
 *
 * @throws {500} - Server error
 */
app.get('/games', (req: Request, res: Response, next: NextFunction) => {
    try {
        if (currentGame.ongoing) {
            res.send({ currentGame });
        } else {
            res.send({ message: 'No game is currently running' });
        }
    } catch (error) {
        next(error);
    }
});


// Error handling middleware should be the last middleware
app.use(errorHandler);

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
