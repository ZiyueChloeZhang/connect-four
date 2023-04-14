export type PlayerId = 1 | 2;
export type PlayerScores = { [key in PlayerId]: number };
export type BoardCell = null | PlayerId;