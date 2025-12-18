"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
async function connectDB(uri) {
    try {
        const mongoUri = uri || env_1.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MongoDB URI is missing');
        }
        await mongoose_1.default.connect(mongoUri);
        console.log('✅ MongoDB connected');
    }
    catch (error) {
        console.error('❌ MongoDB connection failed', error);
        process.exit(1);
    }
}
exports.default = connectDB;
