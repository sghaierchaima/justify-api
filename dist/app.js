"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
// src/app.ts
const express_1 = __importDefault(require("express"));
const token_route_1 = require("./routes/token.route");
const justify_route_1 = require("./routes/justify.route");
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.text({ type: "text/plain", limit: "2mb" })); // body raw text
    app.get("/health", (_req, res) => res.json({ ok: true }));
    app.use("/api", token_route_1.tokenRouter);
    app.use("/api", justify_route_1.justifyRouter);
    return app;
}
