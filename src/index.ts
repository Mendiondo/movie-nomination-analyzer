import express from "express";
import { PORT } from "./consts";
import { loadCsv } from "./parser";
import { registerRoutes } from "./routes";

const app = express();
const port = Number(PORT);

registerRoutes(app);

function startUp(): void {
  loadCsv();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

try {
  startUp();
} catch (error: unknown) {
  console.error("Startup failed:", error);
  process.exit(1);
}
