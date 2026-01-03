// src/services/token.service.ts
import crypto from "crypto";

const SECRET = process.env.TOKEN_SECRET || "dev-secret-change-me";

export function generateToken(email: string): string {
  return crypto.createHash("sha256").update(email.trim().toLowerCase() + SECRET).digest("hex");
}
