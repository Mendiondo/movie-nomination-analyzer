import express from "express";
import { PORT } from "./consts";
import { getAllNominations } from './data/queries';
import { parseCsv } from "./parser";

const app = express();
const port = Number(PORT);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/csv-data", (_req, res) => {
  const nominations = getAllNominations.all();
  res.json(nominations);
});

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
