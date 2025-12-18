"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.JWT_SECRET = exports.PORT = exports.MONGO_URI = void 0;
// src/config/env.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load .env at the very start
// MongoDB connection string
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/backend';
// Server port
exports.PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
// JWT secret key
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
// Node environment
exports.NODE_ENV = process.env.NODE_ENV || 'development';
