import { Request, Response, NextFunction } from "express";

export function requireTextPlain(req: Request, res: Response, next: NextFunction) {
  const ct = req.header("content-type") || "";
  if (!ct.includes("text/plain")) {
    return res.status(415).json({ error: "Content-Type must be text/plain" });
  }
  next();
}
