"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const socket_1 = require("./config/socket");
const env_1 = require("./config/env");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(async () => {
    try {
        await (0, db_1.default)();
        const server = http_1.default.createServer(app_1.default);
        (0, socket_1.initSocket)(server); // ⚡ Socket.io initialized here
        server.listen(env_1.PORT, () => {
            console.log(`Server running on port ${env_1.PORT}`);
        });
    }
    catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
})();
