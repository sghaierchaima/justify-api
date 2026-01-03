"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndConsume = checkAndConsume;
// src/services/rateLimit.service.ts
const dateKey_1 = require("../utils/dateKey");
const LIMIT = 80000;
const usage = new Map();
function checkAndConsume(token, words) {
    const key = `${token}:${(0, dateKey_1.dayKey)()}`;
    const current = usage.get(key) ?? 0;
    if (current + words > LIMIT) {
        return {
            allowed: false,
            limit: LIMIT,
            used: current,
            remaining: Math.max(0, LIMIT - current),
        };
    }
    const newValue = current + words;
    usage.set(key, newValue);
    return {
        allowed: true,
        limit: LIMIT,
        used: newValue,
        remaining: Math.max(0, LIMIT - newValue),
    };
}
