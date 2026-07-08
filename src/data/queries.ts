import database from './database';

const createNomination = database.prepare(`
  INSERT INTO nomination (nomination_id, year, title, studios, winner)
  VALUES (?, ?, ?, ?, ?)
  RETURNING nomination_id, year, title, studios, winner
`);

const createProducer = database.prepare(`
  INSERT INTO producer (producer_id, producer_name, nomination_id)
  VALUES (?, ?, ?)
  RETURNING producer_id, producer_name, nomination_id
`);

const getAllNominations = database.prepare(`
  SELECT * FROM nomination
`);

export { createNomination, createProducer, getAllNominations };