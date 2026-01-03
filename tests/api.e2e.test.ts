import request from "supertest";
import { createApp } from "../src/app";

describe("TicTacTrip Justify API", () => {
  const app = createApp();
  const token = "Bearer testtoken";

  it("POST /api/token returns token", async () => {
    const res = await request(app)
      .post("/api/token")
      .send({ email: "foo@bar.com" });

    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe("string");
    expect(res.body.token.length).toBeGreaterThan(10);
  });

  it("POST /api/justify without token -> 401", async () => {
    const res = await request(app)
      .post("/api/justify")
      .set("Content-Type", "text/plain")
      .send("hello world");

    expect(res.status).toBe(401);
  });

  it("POST /api/justify wrong content-type -> 415", async () => {
    const res = await request(app)
      .post("/api/justify")
      .set("Authorization", token)
      .set("Content-Type", "application/json")
      .send({ text: "hello" });

    expect(res.status).toBe(415);
  });

  it("POST /api/justify returns text/plain", async () => {
    const res = await request(app)
      .post("/api/justify")
      .set("Authorization", token)
      .set("Content-Type", "text/plain")
      .send("This is a long text that should be justified into 80 characters per line.");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("text/plain");
    expect(res.text.length).toBeGreaterThan(0);
  });
});
