import { beforeEach, describe, expect, it } from "vitest";
import { getWinningIntervals } from "../src/analyzer";
import database from "../src/data/database";
import { createNomination } from "../src/models/nomination.model";
import { Nomination } from "../src/types";

function insertWinningNomination(
  year: number,
  title: string,
  producers: string,
): void {
  const nomination: Nomination = {
    year,
    title,
    studios: "My Studio",
    producers,
    winner: true,
  };
  createNomination(nomination);
}

function insertLosingNomination(
  year: number,
  title: string,
  producers: string,
): void {
  const nomination: Nomination = {
    year,
    title,
    studios: "My Studio",
    producers,
    winner: false,
  };
  createNomination(nomination);
}

describe("getWinningIntervals integration", () => {
  beforeEach(() => {
    database.exec("DELETE FROM producer;");
    database.exec("DELETE FROM nomination;");
  });

  it("returns empty min and max when there are no producer intervals", () => {
    insertWinningNomination(1990, "Win 1", "Producer A");
    insertWinningNomination(1991, "Win 2", "Producer B");
    insertWinningNomination(1992, "Win 3", "Producer C");

    const result = getWinningIntervals();

    expect(result).toEqual({
      min: [],
      max: [],
    });
  });

  it("returns all producers tied on minimum and maximum intervals", () => {
    insertWinningNomination(2001, "Win A1", "Producer A");
    insertWinningNomination(2003, "Win A2", "Producer A");

    insertWinningNomination(1990, "Win B1", "Producer B");
    insertWinningNomination(1992, "Win B2", "Producer B");

    insertWinningNomination(1980, "Win C1", "Producer C");
    insertWinningNomination(1995, "Win C2", "Producer C");

    insertWinningNomination(1970, "Win D1", "Producer D");
    insertWinningNomination(1985, "Win D2", "Producer D");

    insertWinningNomination(1970, "Win E1", "Producer E");
    insertWinningNomination(1980, "Win E2", "Producer E");

    const result = getWinningIntervals();

    expect(result.min).toEqual(
      expect.arrayContaining([
        {
          producer: "Producer A",
          interval: 2,
          previousWin: 2001,
          followingWin: 2003,
        },
        {
          producer: "Producer B",
          interval: 2,
          previousWin: 1990,
          followingWin: 1992,
        },
      ]),
    );

    expect(result.max).toEqual(
      expect.arrayContaining([
        {
          producer: "Producer C",
          interval: 15,
          previousWin: 1980,
          followingWin: 1995,
        },
        {
          producer: "Producer D",
          interval: 15,
          previousWin: 1970,
          followingWin: 1985,
        },
      ]),
    );
  });

  it("gets only winning nominations and computes min/max intervals", () => {
    insertWinningNomination(2000, "Win A1", "Producer A");
    insertWinningNomination(2008, "Win A2", "Producer A");

    insertWinningNomination(2010, "Win B1", "Producer B");
    insertWinningNomination(2011, "Win B2", "Producer B");

    insertLosingNomination(2004, "Lost C1", "Producer C");
    insertLosingNomination(2015, "Lost C2", "Producer C");

    const result = getWinningIntervals();

    expect(result.min).toEqual([
      {
        producer: "Producer B",
        interval: 1,
        previousWin: 2010,
        followingWin: 2011,
      },
    ]);

    expect(result.max).toEqual([
      {
        producer: "Producer A",
        interval: 8,
        previousWin: 2000,
        followingWin: 2008,
      },
    ]);
  });
});
