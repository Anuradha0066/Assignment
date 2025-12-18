"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const user_repository_1 = require("../repositories/user.repository");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
function sanitizeUser(user) {
    const obj = user.toObject();
    delete obj.password;
    return obj;
}
async function registerUser(input) {
    const existing = await (0, user_repository_1.findUserByEmail)(input.email);
    if (existing) {
        throw new Error('EMAIL_ALREADY_EXISTS');
    }
    const hashedPassword = await (0, hash_1.hashPassword)(input.password);
    const user = await (0, user_repository_1.createUser)({
        name: input.name,
        email: input.email,
        password: hashedPassword,
    });
    return sanitizeUser(user);
}
async function loginUser(input) {
    const user = await (0, user_repository_1.findUserByEmail)(input.email);
    if (!user) {
        throw new Error('INVALID_CREDENTIALS');
    }
    const isMatch = await (0, hash_1.comparePassword)(input.password, user.password);
    if (!isMatch) {
        throw new Error('INVALID_CREDENTIALS');
    }
    const token = (0, jwt_1.signToken)({ id: user._id.toString() });
    return {
        user: sanitizeUser(user),
        token,
    };
}
exports.default = {
    registerUser,
    loginUser,
};
