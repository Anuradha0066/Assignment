"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTaskHandlers = registerTaskHandlers;
exports.emitTaskCreated = emitTaskCreated;
exports.emitTaskUpdated = emitTaskUpdated;
exports.emitTaskDeleted = emitTaskDeleted;
const socket_1 = require("./socket");
function registerTaskHandlers(socket) {
    socket.on('join-task', (taskId) => {
        socket.join(`task:${taskId}`);
    });
    socket.on('leave-task', (taskId) => {
        socket.leave(`task:${taskId}`);
    });
}
function emitTaskCreated(task) {
    const io = (0, socket_1.getIo)();
    io.emit('task-created', task);
}
function emitTaskUpdated(task) {
    const io = (0, socket_1.getIo)();
    io.to(`task:${task._id}`).emit('task-updated', task);
}
function emitTaskDeleted(task) {
    const io = (0, socket_1.getIo)();
    io.emit('task-deleted', task);
}
