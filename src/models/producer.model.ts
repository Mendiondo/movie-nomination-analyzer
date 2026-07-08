import { v4 as uuidv4 } from 'uuid';
import { insertProducer } from '../data/queries';
import { Nomination } from "../types";

export function createProducers(producers: string[], nominationIndex: string) {
  producers.forEach((producer) => {
    const producerIndex = uuidv4();
    insertProducer.get(producerIndex, producer.trim(), nominationIndex);
  });
}