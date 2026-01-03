"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dayKey = dayKey;
// src/utils/dateKey.ts
function dayKey(d = new Date()) {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}
