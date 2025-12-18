"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const zod_1 = require("zod");
function errorMiddleware(err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
        // 🔥 SIMPLEST - err.issues[0] always works
        return res.status(400).json({
            error: err.issues[0]?.message || 'Please check your input'
        });
    }
    const statusCode = err.statusCode || err.status || 500;
    const message = process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : err.message || 'Internal Server Error';
    res.status(statusCode).json({ error: message });
}
exports.default = errorMiddleware;
