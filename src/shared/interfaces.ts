export type PlayerId = 1 | 2;
export type PlayerScores = { [key in PlayerId]: number };
export type CellValue = null | PlayerId;

export const EMPTY_BOARD: CellValue[][] = Array(7).fill(Array(6).fill(null));

const rowNum = [0, 1, 2, 3, 4, 5];
export type RowNum = typeof rowNum[number];

const colNum = [0, 1, 2, 3, 4, 5, 6];
export type ColNum = typeof colNum[number];