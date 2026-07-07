import Papa from "papaparse";
import { Nomination } from "./types";

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
