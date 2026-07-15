export class CsvParserError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "CsvParserError";
  }
}

export class CsvFileReadError extends CsvParserError {
  constructor(filePath: string, options?: ErrorOptions) {
    super(`Failed to read CSV file at ${filePath}`, options);
    this.name = "CsvFileReadError";
  }
}

export class CsvEmptyContentError extends CsvParserError {
  constructor(context: "file" | "content", filePath?: string) {
    const message =
      context === "file"
        ? `CSV file is empty: ${filePath ?? "unknown path"}`
        : "CSV content is empty";

    super(message);
    this.name = "CsvEmptyContentError";
  }
}

export class CsvDataMissingError extends CsvParserError {
  constructor() {
    super("CSV parser did not return data");
    this.name = "CsvDataMissingError";
  }
}

export class CsvParsingFailedError extends CsvParserError {
  constructor(row: number | "unknown", details: string) {
    super(`CSV parse error at row ${String(row)}: ${details}`);
    this.name = "CsvParsingFailedError";
  }
}