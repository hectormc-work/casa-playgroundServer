"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.featuresRouter = void 0;
const express_1 = __importDefault(require("express"));
const handler = __importStar(require("../../casaHandler"));
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
        const features = handler.getFeatures();
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
        const state = handler.getFeatureState(name);
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
        const success = handler.setFeature(name, state);
        if (success) {
            const message = `Changed FeatureState of: ${name} to: ${state}`;
            const httpMessage = { message, feature };
            res.status(200).send(httpMessage);
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
