"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
const user_repository_1 = require("../repositories/user.repository");
/**
 * Get current user's profile
 * GET /api/users/me
 */
async function getProfile(req, res) {
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
/**
 * Update current user's profile
 * PUT /api/users/me
 */
async function updateProfile(req, res) {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const updates = req.body;
    const updatedUser = await (0, user_repository_1.updateUserById)(userId, updates);
    if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
        user: updatedUser,
    });
}
exports.default = {
    getProfile,
    updateProfile,
};
