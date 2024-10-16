"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.featuresRouter = void 0;
const express_1 = __importDefault(require("express"));
const casaHandler_1 = require("../../casaHandler");
const router = express_1.default.Router();
exports.featuresRouter = router;
/**
 * Get the state of ALL features in body
 *
 * @name GET /features
 *
 * @return {object} - All playground states
 *
 * @throws {500} - Server error
 */
router.get('/', (req, res, next) => {
    try {
        const features = (0, casaHandler_1.getFeatures)();
        res.status(200).send({ message: 'Retrieved all Features', features });
    }
    catch (error) {
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
router.get('/:name', (req, res, next) => {
    try {
        const { name } = req.params;
        const state = (0, casaHandler_1.getFeatureState)(name);
        const feature = { name, state };
        if (state) {
            res.status(200).send({ message: 'Retrieved Feature', feature });
        }
        else {
            res.status(404).send({ message: 'Feature not found', feature });
        }
    }
    catch (error) {
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
router.put('/:name', (req, res, next) => {
    try {
        const { name } = req.params;
        const state = req.body;
        const feature = { name, state };
        const success = (0, casaHandler_1.setFeature)(name, state);
        if (success) {
            const message = { message: 'Changed Feature', feature };
            res.status(200).send(message);
            if (req.broadcast) {
                req.broadcast(message);
            }
        }
        else {
            res.status(400).send({ message: 'Could not Change Feature', feature });
        }
    }
    catch (error) {
        next(error);
    }
});
