import express from "express";
import { readFileSync } from "fs";
import { parseCsvRows } from "./parser";
import { Nomination } from "./types";
import { PORT, CSV_FILE_PATH } from "./consts";
import { createNomination, createProducer, getAllNominations } from './data/queries';

const app = express();
const port = Number(PORT);

let loadedRecords: Nomination[] = [];

async function loadCsv(): Promise<void> {  
  const csvData = readFileSync(CSV_FILE_PATH, "utf-8");

  loadedRecords = parseCsvRows(csvData);

  console.log(`Loaded ${loadedRecords.length} rows`);
  loadedRecords.map((row, index) => {
    createNomination.get(String(index), row.year, row.title, row.studios, row?.winner ? 1 : 0);
    console.log(`Row ${index + 1}: ${JSON.stringify(row)}`);
  });
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/csv-info", (_req, res) => {
  res.json({
    file: CSV_FILE_PATH,
    rows: loadedRecords.length,
    columns: loadedRecords.length > 0 ? Object.keys(loadedRecords[0]) : []
  });
});

app.get("/csv-data", (_req, res) => {
  const nominations = getAllNominations.all();
  res.json(nominations);
});

async function startUp(): Promise<void> {
  await loadCsv();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startUp().catch((error: unknown) => {
  console.error("Startup failed:", error);
  process.exit(1);
});
