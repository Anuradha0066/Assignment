"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = initSocket;
exports.getIo = getIo;
const socket_io_1 = require("socket.io");
const task_socket_1 = require("../sockets/task.socket");
const notification_socket_1 = require("../sockets/notification.socket");
let io = null;
function initSocket(server) {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true,
        },
    });
    io.on('connection', (socket) => {
        (0, task_socket_1.registerTaskHandlers)(socket);
        (0, notification_socket_1.registerNotificationHandlers)(socket);
    });
    console.log('⚡ Socket.io initialized');
    return io;
}
function getIo() {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
}
exports.default = { initSocket, getIo };
