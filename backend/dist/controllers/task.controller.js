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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.getTasks = getTasks;
exports.getTask = getTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
const taskService = __importStar(require("../services/task.service"));
async function createTask(req, res) {
    const creatorId = req.userId;
    if (!creatorId)
        return res.status(401).json({ error: 'Unauthorized' });
    const task = await taskService.createTask({
        ...req.body,
        creatorId,
    });
    res.status(201).json({ task });
}
async function getTasks(req, res) {
    if (!req.userId)
        return res.status(401).json({ error: 'Unauthorized' });
    const tasks = await taskService.getTasks();
    res.json({ tasks });
}
async function getTask(req, res) {
    const { id } = req.params;
    const task = await taskService.getTask(id);
    if (!task)
        return res.status(404).json({ error: 'Not found' });
    res.json({ task });
}
async function updateTask(req, res) {
    const { id } = req.params;
    const updates = req.body;
    const currentUser = req.userId;
    const task = await taskService.getTask(id);
    if (!task)
        return res.status(404).json({ error: 'Not found' });
    // Authorization: only creator or assigned user can update
    if (task.creatorId.toString() !== currentUser && task.assignedToId?.toString() !== currentUser) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    const updated = await taskService.updateTask(id, updates, currentUser);
    res.json({ task: updated });
}
async function deleteTask(req, res) {
    const { id } = req.params;
    const currentUser = req.userId;
    const task = await taskService.getTask(id);
    if (!task)
        return res.status(404).json({ error: 'Not found' });
    if (task.creatorId.toString() !== currentUser)
        return res.status(403).json({ error: 'Forbidden' });
    await taskService.deleteTask(id);
    res.status(204).send();
}
exports.default = { createTask, getTasks, getTask, updateTask, deleteTask };
