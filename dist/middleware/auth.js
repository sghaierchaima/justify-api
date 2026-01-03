"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
function authMiddleware(req, res, next) {
    const h = req.header("authorization") || "";
    const token = h.startsWith("Bearer ") ? h.slice(7).trim() : h.trim();
    if (!token)
        return res.status(401).json({ error: "Missing token" });
    // Ici: tu peux vérifier que le token existe (si tu maintiens un registry),
    // ou accepter tout token généré par /api/token.
    req.token = token;
    next();
}
