import express, {NextFunction, Request, Response} from "express";
import {getFeatures, getFeatureState, setFeature} from "../casaHandler";
import {Feature, FeatureName, FeatureState} from "../types";
import {broadcast} from "../casaServer";

const router = express.Router();

/**
 * Get the state of ALL features in body
 *
 * @name GET /features
 *
 * @return {object} - All playground states
 *
 * @throws {500} - Server error
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const features = getFeatures();
        res.status(200).send({ message: 'Retrieved all Features', features });
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
router.get('/:name', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.params;
        const state = getFeatureState(name as FeatureName);
        const feature = { name, state } as Feature;

        if (state) {
            res.status(200).send({ message: 'Retrieved Feature', feature });
        } else {
            res.status(404).send({ message: 'Feature not found', feature });
        }

    } catch (error) {
        next(error);
    }
});

/**
 * Change a feature's state to state given in req.body
 *
 * @name PUT /features/:name
 *
 * @param {string} name - Name of the feature
 * @param {FeatureState} body - The new state for the feature
 * @return {object} - Success message with updated feature name and state
 *
 * @throws {400} - Bad request if validation fails
 * @throws {500} - Server error
 */
router.put('/:name', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.params;
        const state: FeatureState = req.body;
        const feature = { name, state } as Feature;

        const success = setFeature(name as FeatureName, state);

        if (success) {
            const message = { message: 'Changed Feature', feature }

            res.status(200).send(message);
            broadcast(message);
        } else {
            res.status(400).send({ message: 'Could not Change Feature', feature });
        }

    } catch (error) {
        next(error);
    }
});

export { router as featuresRouter }
