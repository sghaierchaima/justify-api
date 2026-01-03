// src/app.ts
import express from "express";
import { tokenRouter } from "./routes/token.route";
import { justifyRouter } from "./routes/justify.route";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.text({ type: "text/plain", limit: "2mb" })); // body raw text

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use("/api", tokenRouter);
  app.use("/api", justifyRouter);

  return app;
}
