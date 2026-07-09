import { getProducersWinningIntervalAscending } from "./data/queries";
import { WinningInterval } from "./types";

export function getWinningIntervals() {
  const winningIntervals = getProducersWinningIntervalAscending.all() as WinningInterval[];

  if (winningIntervals.length === 0) {
    return {
      min: [],
      max: [],
    };
  }

  const lowerIntervalValue = winningIntervals[0].interval;
  const higherIntervalValue = winningIntervals[winningIntervals.length - 1].interval;

  const lowerIntervals = winningIntervals.filter(
    (winningInterval) => winningInterval.interval === lowerIntervalValue,
  );
  const higherIntervals = winningIntervals.filter(
    (winningInterval) => winningInterval.interval === higherIntervalValue,
  );


  return {
    min: lowerIntervals,
    max: higherIntervals,
  };
}