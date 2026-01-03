// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const h = req.header("authorization") || "";
  const token = h.startsWith("Bearer ") ? h.slice(7).trim() : h.trim();

  if (!token) return res.status(401).json({ error: "Missing token" });

  // Ici: tu peux vérifier que le token existe (si tu maintiens un registry),
  // ou accepter tout token généré par /api/token.
  (req as any).token = token;
  next();
}
