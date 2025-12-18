"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.me = me;
const auth_service_1 = require("../services/auth.service");
const user_repository_1 = require("../repositories/user.repository");
/**
 * Register a new user
 * POST /api/auth/register
 */
async function register(req, res) {
    const { name, email, password } = req.body;
    const user = await (0, auth_service_1.registerUser)({ name, email, password });
    res.status(201).json({
        user,
    });
}
/**
 * Login user
 * POST /api/auth/login
 */
async function login(req, res) {
    const { email, password } = req.body;
    const { user, token } = await (0, auth_service_1.loginUser)({ email, password });
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/', // 🔥 MUST
    });
    // ✅ CORRECT:
    res.status(200).json({ user, token });
}
/**
 * Logout user
 * POST /api/auth/logout
 */
async function logout(_req, res) {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict',
    });
    res.status(204).send();
}
/**
 * Get current logged-in user
 * GET /api/auth/me
 */
async function me(req, res) {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await (0, user_repository_1.findUserById)(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
        user,
    });
}
exports.default = {
    register,
    login,
    logout,
    me,
};
