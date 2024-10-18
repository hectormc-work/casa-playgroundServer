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
exports.broadcast = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const router_1 = require("./api/router");
const usersValidator = __importStar(require("./api/users/middleware"));
const casaHandler_1 = require("./casaHandler");
const casaState_1 = __importDefault(require("./casaState"));
const app = (0, express_1.default)();
const port = 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize cookie session
app.use((0, express_session_1.default)({
    secret: 'HeathInteractive',
    resave: true,
    saveUninitialized: false
}));
app.use(usersValidator.doesCurrentSessionUserExists);
const CASA_STATE = casaState_1.default.getInstance();
function broadcast(message) {
    const features = CASA_STATE.getFeatures();
    const game = CASA_STATE.getGame();
    wss.clients.forEach(client => {
        if (client.readyState === ws_1.WebSocket.OPEN) {
            client.send(JSON.stringify({ message, features, game }));
        }
    });
}
exports.broadcast = broadcast;
app.use((req, res, next) => {
    req.broadcast = broadcast; // Attach broadcast function to the req object
    next();
});
/**
 * Add Routes
 */
/**
 * Sends a 'Hello, world' message.
 */
app.get('/', (req, res) => {
    res.send('Hello, world! Is this going through?');
});
app.use('/api', router_1.apiRouter);
// Middleware for error handling
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
}
app.use(errorHandler); // Error handling middleware should be the last middleware
/**
 * Start the Servers
 */
// Start WebSocket
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
let gameWasOngoing = false;
// Start the Express server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    setInterval(() => {
        gameWasOngoing = (0, casaHandler_1.checkGameEnd)(gameWasOngoing);
    }, 1000); // 1000ms = 1 second
});
