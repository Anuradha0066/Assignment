"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = void 0;
const zod_1 = require("zod");
exports.UpdateUserSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(2).max(50).optional(),
    email: zod_1.z.string().trim().email().optional(),
})
    .strict();
