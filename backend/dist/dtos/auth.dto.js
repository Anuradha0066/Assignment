"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_1 = require("zod");
exports.RegisterSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2).max(50),
    email: zod_1.z.string().trim().email(),
    password: zod_1.z.string().min(6).max(100),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email(),
    password: zod_1.z.string().min(6).max(100),
});
