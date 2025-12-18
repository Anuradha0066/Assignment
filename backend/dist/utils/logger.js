"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = log;
function log(...args) {
    // simple logger wrapper
    // eslint-disable-next-line no-console
    console.log(new Date().toISOString(), ...args);
}
exports.default = { log };
