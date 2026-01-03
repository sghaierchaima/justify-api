// src/server.ts
import { createApp } from "./app";

const app = createApp();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(`Listening on :${port}`);
});
