"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = createNotification;
exports.getNotificationsForUser = getNotificationsForUser;
const notification_model_1 = __importDefault(require("../models/notification.model"));
async function createNotification(data) {
    return notification_model_1.default.create(data);
}
async function getNotificationsForUser(userId) {
    return notification_model_1.default.find({ userId })
        .sort({ createdAt: -1 })
        .lean()
        .exec();
}
exports.default = {
    createNotification,
    getNotificationsForUser,
};
