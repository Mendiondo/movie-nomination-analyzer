import express from "express";
import { PORT } from "./consts";
import { parseCsv } from "./parser";
import { registerRoutes } from "./routes";

const app = express();
const port = Number(PORT);

registerRoutes(app);

async function startUp(): Promise<void> {
  await parseCsv();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startUp().catch((error: unknown) => {
  console.error("Startup failed:", error);
  process.exit(1);
});
