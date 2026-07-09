export type Nomination = {
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: boolean;
}

export type WinningInterval = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};