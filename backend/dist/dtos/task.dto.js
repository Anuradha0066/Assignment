"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskSchema = exports.CreateTaskSchema = exports.StatusEnum = exports.PriorityEnum = void 0;
const zod_1 = require("zod");
exports.PriorityEnum = zod_1.z.enum(['Low', 'Medium', 'High', 'Urgent']);
exports.StatusEnum = zod_1.z.enum([
    'To Do',
    'In Progress',
    'Review',
    'Completed',
]);
const objectIdSchema = zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');
exports.CreateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    dueDate: zod_1.z.string().optional(),
    priority: zod_1.z.enum(['Low', 'Medium', 'High', 'Urgent']).default('Medium'),
    // creatorId: z.string(),
    assignedToId: zod_1.z.string().optional(),
    status: zod_1.z.enum(['To Do', 'In Progress', 'Review', 'Completed']).default('To Do'), // ✅ yahan add
})
    .strict();
exports.UpdateTaskSchema = zod_1.z
    .object({
    title: zod_1.z.string().trim().min(1).max(100).optional(),
    description: zod_1.z.string().trim().optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    priority: exports.PriorityEnum.optional(),
    status: exports.StatusEnum.optional(),
    assignedToId: objectIdSchema.optional(),
})
    .strict();
