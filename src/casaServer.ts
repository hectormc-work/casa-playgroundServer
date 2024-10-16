import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import cors from 'cors';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { apiRouter } from "./api/router";
import * as usersValidator from './api/users/middleware';

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
        broadcast?: any;
    }
}

// Initialize cookie session
app.use(session({
    secret: 'HeathInteractive',
    resave: true,
    saveUninitialized: false
}));

app.use(usersValidator.doesCurrentSessionUserExists);

function broadcast(data: any) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
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

// Start the Express server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
