import { DatabaseSync } from 'node:sqlite';

const database = new DatabaseSync(':memory:');

const initDatabase = `
  CREATE TABLE IF NOT EXISTS nomination(
    nomination_id TEXT PRIMARY KEY,
    year SMALLINT NOT NULL,
    title TEXT NOT NULL,
    studios TEXT NOT NULL,
    winner BOOLEAN NOT NULL
  );

  CREATE TABLE IF NOT EXISTS producer (
    producer_id TEXT PRIMARY KEY,
    nomination_id TEXT NOT NULL,
    producer_name TEXT NOT NULL,
    FOREIGN KEY (nomination_id) REFERENCES nomination (nomination_id)
  );
`;

database.exec(initDatabase);

export default database;