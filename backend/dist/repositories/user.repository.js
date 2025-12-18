"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.findUserByEmail = findUserByEmail;
exports.findUserById = findUserById;
exports.updateUserById = updateUserById;
const user_model_1 = __importDefault(require("../models/user.model"));
async function createUser(data) {
    return user_model_1.default.create(data);
}
async function findUserByEmail(email) {
    return user_model_1.default.findOne({ email })
        .select('+password')
        .exec(); // document needed for password compare
}
async function findUserById(id) {
    return user_model_1.default.findById(id)
        .select('-password')
        .lean() // 👈 IMPORTANT
        .exec();
}
async function updateUserById(id, updates) {
    return user_model_1.default.findByIdAndUpdate(id, updates, {
        new: true,
    })
        .select('-password')
        .lean()
        .exec();
}
exports.default = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUserById,
};
