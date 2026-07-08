import Papa from "papaparse";
import { Nomination } from "./types";
import { createNomination } from "./models/nomination.model";
import { readFileSync } from "fs";

import { CSV_FILE_PATH } from "./consts";

export async function parseCsv(): Promise<void> {  
  const csvData = readFileSync(CSV_FILE_PATH, "utf-8");

  const loadedRecords = parseCsvRows(csvData);

  console.log(`Loaded ${loadedRecords.length} rows`);
  loadedRecords.forEach((row) => {
    createNomination(row);
  });
}

export function parseCsvRows(csvData: string): Nomination[] {
  const result = Papa.parse<Nomination>(csvData, {
    header: true,
    delimiter: ";",
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
    transform: (value) => value.trim(),
    dynamicTyping: true,
  });

  if (result.errors.length > 0) {
    const error = result.errors[0];
    throw new Error(`CSV parse error at row ${String(error.row ?? "unknown")}: ${error.message}`);
  }

  return result?.data ?? [];
}
