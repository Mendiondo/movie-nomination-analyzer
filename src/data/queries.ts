import database from './database';

const insertNomination = database.prepare(`
  INSERT INTO nomination (nomination_id, year, title, studios, winner)
  VALUES (?, ?, ?, ?, ?)
  RETURNING nomination_id, year, title, studios, winner
`);

const insertProducer = database.prepare(`
  INSERT INTO producer (producer_id, producer_name, nomination_id)
  VALUES (?, ?, ?)
  RETURNING producer_id, producer_name, nomination_id
`);

const getAllNominations = database.prepare(`
  SELECT a.nomination_id, a.year, a.title, a.studios, a.winner, b.producer_id, b.producer_name
  FROM nomination a
  INNER JOIN producer b ON a.nomination_id = b.nomination_id
`);

export { insertNomination, insertProducer, getAllNominations };