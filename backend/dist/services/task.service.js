"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.getTasks = getTasks;
exports.getTask = getTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
const repo = __importStar(require("../repositories/task.repository"));
const mongoose_1 = require("mongoose");
const task_socket_1 = require("../sockets/task.socket");
const notification_socket_1 = require("../sockets/notification.socket");
const notification_service_1 = require("./notification.service");
const taskLog_model_1 = __importDefault(require("../models/taskLog.model"));
async function createTask(data) {
    if (!data.creatorId) {
        throw new Error('CREATOR_REQUIRED');
    }
    const task = await repo.createTask({
        ...data,
        creatorId: new mongoose_1.Types.ObjectId(data.creatorId),
        assignedToId: data.assignedToId
            ? new mongoose_1.Types.ObjectId(data.assignedToId)
            : undefined,
        status: 'To Do'
    });
    try {
        (0, task_socket_1.emitTaskCreated)(task);
    }
    catch (e) {
        console.warn('⚠️ Socket not ready, skipping emit');
    }
    return task;
}
async function getTasks(filter = {}) {
    return repo.getTasks(filter);
}
async function getTask(id) {
    return repo.getTaskById(id);
}
async function updateTask(id, updates, userId) {
    const previous = await repo.getTaskById(id);
    if (!previous)
        return null;
    const updated = await repo.updateTaskById(id, {
        ...updates,
        assignedToId: updates.assignedToId
            ? new mongoose_1.Types.ObjectId(updates.assignedToId)
            : undefined,
    });
    if (!updated)
        return null;
    // 🔹 Audit log for status change
    if (updates.status && updates.status !== previous.status) {
        await taskLog_model_1.default.create({
            taskId: id,
            userId,
            field: 'status',
            oldValue: previous.status,
            newValue: updates.status,
        });
    }
    // 🔹 Audit log for priority change (optional but nice)
    if (updates.priority && updates.priority !== previous.priority) {
        await taskLog_model_1.default.create({
            taskId: id,
            userId,
            field: 'priority',
            oldValue: previous.priority,
            newValue: updates.priority,
        });
    }
    // Emit updates for real-time sync
    if ((updates.status && updates.status !== previous.status) ||
        (updates.priority && updates.priority !== previous.priority)) {
        try {
            (0, task_socket_1.emitTaskUpdated)(updated);
        }
        catch {
            console.warn('⚠️ Socket not ready, skipping emit');
        }
    }
    // Assignment notification (ye block as‑is rehne do)
    if (updates.assignedToId &&
        updates.assignedToId !== previous.assignedToId?.toString()) {
        const notification = await (0, notification_service_1.notifyAssignment)({
            userId: updates.assignedToId,
            taskId: id,
            message: 'You have been assigned a new task',
        });
        (0, notification_socket_1.emitNotification)(updates.assignedToId, notification);
    }
    return updated;
}
async function deleteTask(id) {
    const deleted = await repo.deleteTaskById(id);
    if (deleted) {
        try {
            (0, task_socket_1.emitTaskDeleted)(deleted);
        }
        catch {
            console.warn('⚠️ Socket not ready, skipping emit');
        }
    }
    return deleted;
}
exports.default = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
};
