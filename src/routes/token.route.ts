// src/routes/token.route.ts
import { Router } from "express";
import { generateToken } from "../services/token.service";

export const tokenRouter = Router();

tokenRouter.post("/token", (req, res) => {
  const email = String(req.body?.email || "").trim();
  if (!email) return res.status(400).json({ error: "email is required" });

  const token = generateToken(email);
  return res.json({ token });
});
