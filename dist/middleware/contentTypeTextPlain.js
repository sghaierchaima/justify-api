"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireTextPlain = requireTextPlain;
function requireTextPlain(req, res, next) {
    const ct = req.header("content-type") || "";
    if (!ct.includes("text/plain")) {
        return res.status(415).json({ error: "Content-Type must be text/plain" });
    }
    next();
}
