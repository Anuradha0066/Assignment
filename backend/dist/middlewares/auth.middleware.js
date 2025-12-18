"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../utils/jwt");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = req.cookies?.token ||
        (authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        req.userId = payload.id;
        return next();
    }
    catch {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
exports.default = authMiddleware;
