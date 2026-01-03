"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
// src/services/token.service.ts
const crypto_1 = __importDefault(require("crypto"));
const SECRET = process.env.TOKEN_SECRET || "dev-secret-change-me";
function generateToken(email) {
    return crypto_1.default.createHash("sha256").update(email.trim().toLowerCase() + SECRET).digest("hex");
}
