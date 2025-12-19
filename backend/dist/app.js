"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./routes");
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get('/', (_req, res) => {
    res.json({
        message: 'TaskFlow Backend API ✅',
        health: 'ok',
        endpoints: ['/api/v1/auth/register', '/api/v1/tasks']
    });
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
    'http://localhost:5173',           // Local dev
    'https://candid-cheesecake-00f96c.netlify.app'  // 🔥 NETLIFY URL
  ],

    // credentials: true,
}));
app.use(routes_1.apiRouter);
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use(error_middleware_1.default);
exports.default = app;
