"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = getNotifications;
const notification_repository_1 = require("../repositories/notification.repository");
async function getNotifications(req, res) {
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ error: 'Unauthorized' });
    const list = await (0, notification_repository_1.getNotificationsForUser)(userId);
    res.json({ notifications: list });
}
exports.default = { getNotifications };
