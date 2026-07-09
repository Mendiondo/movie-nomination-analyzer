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
  SELECT nomination.*, producer.*
  FROM nomination
  INNER JOIN producer ON nomination.nomination_id = producer.nomination_id
`);

const getProducersWinningIntervalAscending = database.prepare(`
  WITH producer_wins AS (
    SELECT DISTINCT
      producer.producer_name AS producer,
      nomination.year AS win_year
    FROM producer
    INNER JOIN nomination ON nomination.nomination_id = producer.nomination_id
    WHERE nomination.winner = 1
  ),
  ranked_intervals AS (
    SELECT
      current_win.producer AS producer,
      current_win.win_year AS previousWin,
      next_win.win_year AS followingWin,
      next_win.win_year - current_win.win_year AS interval
    FROM producer_wins AS current_win
    INNER JOIN producer_wins AS next_win ON next_win.producer = current_win.producer
     AND next_win.win_year = (
       SELECT MIN(candidate.win_year)
       FROM producer_wins AS candidate
       WHERE candidate.producer = current_win.producer
         AND candidate.win_year > current_win.win_year
     )
  )
  SELECT producer, interval, previousWin, followingWin
  FROM ranked_intervals 
  ORDER BY interval
`);

export {
  insertNomination,
  insertProducer,
  getAllNominations,
  getProducersWinningIntervalAscending,
};