import Papa from "papaparse";
import { Nomination } from "./types";
import { createNomination } from "./models/nomination.model";
import { readFileSync } from "fs";
import {
  CsvDataMissingError,
  CsvEmptyContentError,
  CsvFileReadError,
  CsvParserError,
  CsvParsingFailedError,
} from "./errors";

import { CSV_FILE_PATH } from "./consts";

export function loadCsv(): void {  
  const loadedRecords: Nomination[] = parseCsv();

  console.log(`Loaded ${loadedRecords.length} rows`);
  loadedRecords.forEach((row) => {
    createNomination(row);
  });
}

export function parseCsv(): Nomination[] {
  try {
    const csvData = readFileSync(CSV_FILE_PATH, "utf-8");
    if (csvData.trim().length === 0) {
      throw new CsvEmptyContentError("file", CSV_FILE_PATH);
    }

    const loadedRecords = parseCsvRows(csvData);
    return loadedRecords;
  } catch (error: unknown) {
    if (error instanceof CsvParserError) {
      throw error;
    }

    throw new CsvFileReadError(CSV_FILE_PATH, {
      cause: error,
    });
  }
}

export function parseCsvRows(csvData: string): Nomination[] {
  if (csvData.trim().length === 0) {
    throw new CsvEmptyContentError("content");
  }

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
    throw new CsvParsingFailedError(error.row ?? "unknown", error.message);
  }

  if (!result.data) {
    throw new CsvDataMissingError();
  }

  return result.data;
}
