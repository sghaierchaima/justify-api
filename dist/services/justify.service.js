"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyText = justifyText;
// src/services/justify.service.ts
function justifyText(input, width = 80) {
    // Normalise espaces, garde les sauts de lignes multiples comme séparateurs de paragraphes
    const paragraphs = input
        .replace(/\r\n/g, "\n")
        .split(/\n\s*\n/); // paragraphes séparés par ligne vide
    const justifiedParagraphs = paragraphs.map((p) => justifyParagraph(p, width));
    return justifiedParagraphs.join("\n\n");
}
function justifyParagraph(paragraph, width) {
    const words = paragraph
        .replace(/\n/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean);
    if (words.length === 0)
        return "";
    const lines = [];
    let current = [];
    let currentLen = 0; // somme des longueurs des mots (sans espaces)
    for (const w of words) {
        const nextLen = currentLen + w.length;
        const minimalSpaces = current.length; // espaces simples entre mots
        if (nextLen + minimalSpaces <= width) {
            current.push(w);
            currentLen = nextLen;
        }
        else {
            lines.push(justifyLine(current, currentLen, width, false));
            current = [w];
            currentLen = w.length;
        }
    }
    // dernière ligne: left aligned
    lines.push(justifyLine(current, currentLen, width, true));
    return lines.join("\n");
}
function justifyLine(words, wordsLen, width, isLast) {
    if (words.length === 1 || isLast) {
        return words.join(" ");
    }
    const gaps = words.length - 1;
    const spacesToDistribute = width - wordsLen;
    const base = Math.floor(spacesToDistribute / gaps);
    let extra = spacesToDistribute % gaps;
    let out = "";
    for (let i = 0; i < words.length; i++) {
        out += words[i];
        if (i < gaps) {
            const count = base + (extra > 0 ? 1 : 0);
            if (extra > 0)
                extra--;
            out += " ".repeat(count);
        }
    }
    return out;
}
