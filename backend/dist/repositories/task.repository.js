"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.getTasks = getTasks;
exports.getTaskById = getTaskById;
exports.updateTaskById = updateTaskById;
exports.deleteTaskById = deleteTaskById;
const task_model_1 = __importDefault(require("../models/task.model"));
async function createTask(data) {
    return task_model_1.default.create(data);
}
async function getTasks(filter = {}) {
    return task_model_1.default.find(filter)
        .sort({ createdAt: -1 })
        .lean()
        .exec();
}
async function getTaskById(id) {
    return task_model_1.default.findById(id).exec();
}
async function updateTaskById(id, updates) {
    return task_model_1.default.findByIdAndUpdate(id, updates, {
        new: true,
    }).exec();
}
async function deleteTaskById(id) {
    return task_model_1.default.findByIdAndDelete(id).exec();
}
exports.default = {
    createTask,
    getTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
};
