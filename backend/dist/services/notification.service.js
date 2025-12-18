"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyAssignment = notifyAssignment;
const mongoose_1 = require("mongoose");
const notification_repository_1 = require("../repositories/notification.repository");
async function notifyAssignment(input) {
    return (0, notification_repository_1.createNotification)({
        userId: new mongoose_1.Types.ObjectId(input.userId),
        taskId: new mongoose_1.Types.ObjectId(input.taskId),
        message: input.message,
    });
}
exports.default = {
    notifyAssignment,
};
