import { v4 as uuidv4 } from 'uuid';
import { insertNomination, insertProducer } from '../data/queries';
import { Nomination } from "../types";
import { createProducers } from './producer.model';

export function createNomination(nomination: Nomination) {
  const nominationIndex = uuidv4();
  insertNomination.get(nominationIndex, nomination.year, nomination.title, nomination.studios, nomination?.winner ? 1 : 0);
  const producers: string[] = splitProducers(nomination);
  createProducers(producers, nominationIndex);
}

function splitProducers(nomination: Nomination): string[] {
  return nomination.producers.split(/,| and /);
}
