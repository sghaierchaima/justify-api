// src/routes/justify.route.ts
import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { requireTextPlain } from "../middleware/contentTypeTextPlain";
import { countWords } from "../utils/wordCount";
import { checkAndConsume } from "../services/rateLimit.service";
import { justifyText } from "../services/justify.service";

export const justifyRouter = Router();

// IMPORTANT: pour lire text/plain, configure express.text() dans app.ts
justifyRouter.post("/justify", authMiddleware, requireTextPlain, (req, res) => {
  const token = (req as any).token as string;
  const input = typeof req.body === "string" ? req.body : "";

  const words = countWords(input);
  const usage = checkAndConsume(token, words);

  res.setHeader("X-RateLimit-Limit", String(usage.limit));
  res.setHeader("X-RateLimit-Remaining", String(usage.remaining));

  if (!usage.allowed) {
    return res.status(402).json({ error: "Payment Required", message: "Daily quota exceeded" });
  }

  const out = justifyText(input, 80);
  res.type("text/plain").send(out);
});
