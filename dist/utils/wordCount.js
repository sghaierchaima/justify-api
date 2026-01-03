"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countWords = countWords;
// src/utils/wordCount.ts
function countWords(text) {
    const cleaned = text.trim();
    if (!cleaned)
        return 0;
    return cleaned.split(/\s+/).filter(Boolean).length;
}
