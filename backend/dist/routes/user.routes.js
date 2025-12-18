"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const user_dto_1 = require("../dtos/user.dto");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.use(auth_middleware_1.default);
router.get('/me', user_controller_1.getProfile);
router.put('/me', (0, validate_middleware_1.default)(user_dto_1.UpdateUserSchema), user_controller_1.updateProfile);
exports.default = router;
