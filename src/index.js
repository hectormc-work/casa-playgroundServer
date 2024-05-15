"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8080;
app.use((0, cors_1.default)());
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// Define a route handler for receiving POST requests
app.post('/data', (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    res.send('Data received');
});
// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
