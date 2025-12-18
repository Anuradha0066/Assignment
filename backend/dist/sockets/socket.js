"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = initSocket;
exports.getIo = getIo;
const socket_io_1 = require("socket.io");
const task_socket_1 = require("./task.socket");
const notification_socket_1 = require("./notification.socket");
let io = null;
function initSocket(server) {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || 'http://localhost:5173',
            credentials: true,
        },
    });
    io.on('connection', (socket) => {
        const userId = socket.handshake.auth?.userId;
        if (userId) {
            socket.join(`user:${userId}`);
        }
        (0, task_socket_1.registerTaskHandlers)(socket);
        (0, notification_socket_1.registerNotificationHandlers)(socket);
    });
    return io;
}
function getIo() {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
}
exports.default = {
    initSocket,
    getIo,
};
