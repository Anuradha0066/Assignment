"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNotificationHandlers = registerNotificationHandlers;
exports.emitNotification = emitNotification;
const socket_1 = require("./socket");
function registerNotificationHandlers(socket) {
    socket.on('subscribe-notifications', () => {
        const userId = socket.handshake.auth?.userId;
        if (userId) {
            socket.join(`notifications:${userId}`);
        }
    });
}
function emitNotification(userId, notification) {
    const io = (0, socket_1.getIo)();
    io.to(`notifications:${userId}`).emit('notification', notification);
}
exports.default = {
    registerNotificationHandlers,
    emitNotification,
};
