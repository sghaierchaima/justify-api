"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRouter = void 0;
// src/routes/token.route.ts
const express_1 = require("express");
const token_service_1 = require("../services/token.service");
exports.tokenRouter = (0, express_1.Router)();
exports.tokenRouter.post("/token", (req, res) => {
    const email = String(req.body?.email || "").trim();
    if (!email)
        return res.status(400).json({ error: "email is required" });
    const token = (0, token_service_1.generateToken)(email);
    return res.json({ token });
});
