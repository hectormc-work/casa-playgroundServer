import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import cors from 'cors';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { apiRouter } from "./api/router";
import * as usersValidator from './api/users/middleware';
import {Game} from "./types";
import {checkGameEnd} from "./casaHandler";
import CasaState from "./casaState";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

declare module 'express-session' {
    interface SessionData {
        username: string;
    }
}

declare module "express-serve-static-core" {
    interface Request {
        broadcast?: (message: string) => void;
        game?: Game;
    }
}

// Initialize cookie session
app.use(session({
    secret: 'HeathInteractive',
    resave: true,
    saveUninitialized: false
}));

app.use(usersValidator.doesCurrentSessionUserExists);

const CASA_STATE = CasaState.getInstance()

function broadcast(message: string) {
    const features = CASA_STATE.getFeatures()
    const game = CASA_STATE.getGame()
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ message, features, game}));
        }
    });
}
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
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world! Is this going through?');
});
app.use('/api', apiRouter)

// Middleware for error handling
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
}
app.use(errorHandler) // Error handling middleware should be the last middleware

/**
 * Start the Servers
 */

// Start WebSocket
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    ws.on('message', (message: string) => {
        console.log(`Received message => ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

let gameWasOngoing = false
// Start the Express server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);

    setInterval(() => {
        gameWasOngoing = checkGameEnd(gameWasOngoing, broadcast);
    }, 1000); // 1000ms = 1 second
});
