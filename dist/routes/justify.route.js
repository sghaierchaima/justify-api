"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyRouter = void 0;
// src/routes/justify.route.ts
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const contentTypeTextPlain_1 = require("../middleware/contentTypeTextPlain");
const wordCount_1 = require("../utils/wordCount");
const rateLimit_service_1 = require("../services/rateLimit.service");
const justify_service_1 = require("../services/justify.service");
exports.justifyRouter = (0, express_1.Router)();
// IMPORTANT: pour lire text/plain, configure express.text() dans app.ts
exports.justifyRouter.post("/justify", auth_1.authMiddleware, contentTypeTextPlain_1.requireTextPlain, (req, res) => {
    const token = req.token;
    const input = typeof req.body === "string" ? req.body : "";
    const words = (0, wordCount_1.countWords)(input);
    const usage = (0, rateLimit_service_1.checkAndConsume)(token, words);
    res.setHeader("X-RateLimit-Limit", String(usage.limit));
    res.setHeader("X-RateLimit-Remaining", String(usage.remaining));
    if (!usage.allowed) {
        return res.status(402).json({ error: "Payment Required", message: "Daily quota exceeded" });
    }
    const out = (0, justify_service_1.justifyText)(input, 80);
    res.type("text/plain").send(out);
});
