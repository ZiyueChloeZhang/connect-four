import { z } from "zod";

const color = z.enum(["RED", "YELLOW"]);
export type Color = z.infer<typeof color>;

// each board cell can be null, RED or YELLOW
const cellSchema = color.or(z.null());
export type Cell = z.infer<typeof cellSchema>;

// a board has 7 columns and 6 rows
const columnSchema = z.array(cellSchema).length(6).refine(x => isColumnValid(x));

const boardSchema = z.array(columnSchema).length(7);
export type Board = z.infer<typeof boardSchema>

const cellPositionSchema = z.tuple([
    z.number().min(0).max(6), // column index
    z.number().min(0).max(5) //  row index
]);
export type CellPosition = z.infer<typeof cellPositionSchema>;

// a game has a board and a current turn
const gameSchema = z.object({
    board: boardSchema,
    winner: color.or(z.null()),
    connectedCellPositions: z.array(cellPositionSchema).length(4, "must have 4 connected cells to win").or(z.null()),
}).refine(({ winner, connectedCellPositions }) => {
    if (winner === null) return connectedCellPositions === null;
    return true;
})
export type Game = z.infer<typeof gameSchema>;


export const makeAMove = async (color: Color, columnIndex: number, board: Board) => {
    const column = board[columnIndex];
    const lastEmptyRowIndex = getlastEmptyRowIndex(column);

    // update board
    const updatedBoard = board.map((x) => [...x]);
    updatedBoard[columnIndex][lastEmptyRowIndex] = color;

    // check win
    let connectedPositionsRes = null;
    let winner = null;
    try {
        connectedPositionsRes = await connectedPositions(updatedBoard, [columnIndex, lastEmptyRowIndex]);
        if (connectedPositionsRes) winner = color;
    } catch (error) {
        console.info('no connected fours');
    }

    return {
        board: updatedBoard,
        connectedCellPositions: connectedPositionsRes,
        winner: winner
    };
}

export function getlastEmptyRowIndex(column: Cell[]) {
    const firstFilledCellIndex = column.findIndex((cell) => cell !== null);
    // column is full
    if (firstFilledCellIndex === 0) throw new Error('column is full');
    // column is empty
    if (firstFilledCellIndex === -1) return column.length - 1;
    // other
    return firstFilledCellIndex - 1;
}

export function isColumnFull(column: Cell[]) {
    try {
        return column.every(x => x !== null);
    } catch (error) {
        throw error;
    }
}

export function isColumnValid(column: Cell[]) {
    const firstFilledCellIndex = column.findIndex((cell) => cell !== null);
    // column is full
    if (firstFilledCellIndex === 0) return true;
    // column is empty
    if (firstFilledCellIndex === -1) return true;
    // other
    return column.slice(firstFilledCellIndex - 1).every(x => x !== null);
}

export async function hasConnectedFour(collection: Cell[], index: number) {
    // first in the four
    const first = new Promise<number[]>((resolve, reject) => {
        if (
            collection[index]
            && collection[index] === collection[index + 1]
            && collection[index] === collection[index + 2]
            && collection[index] === collection[index + 3]
        ) {
            resolve([index, index + 1, index + 2, index + 3]);
        } else {
            reject();
        }
    });

    // second in the four
    const second = new Promise<number[]>((resolve, reject) => {
        if (
            collection[index]
            && collection[index - 1] === collection[index]
            && collection[index] === collection[index + 1]
            && collection[index] === collection[index + 2]
        ) {
            resolve([index - 1, index, index + 1, index + 2]);
        } else {
            reject();
        }
    });

    // third in the four
    const third = new Promise<number[]>((resolve, reject) => {
        if (
            collection[index]
            && collection[index - 2] === collection[index - 1]
            && collection[index - 1] === collection[index]
            && collection[index] === collection[index + 1]
        ) {
            resolve([index - 2, index - 1, index, index + 1]);
        } else {
            reject();
        }
    });

    // fourth is the four
    const fourth = new Promise<number[]>((resolve, reject) => {
        if (
            collection[index]
            && collection[index - 3] === collection[index - 2]
            && collection[index - 2] === collection[index - 1]
            && collection[index - 1] === collection[index]
        ) {
            resolve([index - 3, index - 2, index - 1, index]);
        } else {
            reject();
        }
    });

    return Promise.any([first, second, third, fourth])
        .then((connectedPositions) => connectedPositions);
}

export const verticallyConnectedPositions = (board: Board, position: CellPosition) => new Promise<CellPosition[]>((resolve, reject) => {
    const [col, row] = position;

    return hasConnectedFour(board[col], row)
        .then(
            ([first, second, third, fourth]) => resolve([[col, first], [col, second], [col, third], [col, fourth]]),
        )
        .catch((reason) => { reject(reason) });
});

export const horizontallyConnectedPositions = (board: Board, position: CellPosition) => new Promise<CellPosition[] | null>((resolve, reject) => {
    const [colIndex, rowIndex] = position;
    const row = getRow(board, rowIndex);

    return hasConnectedFour(row, colIndex).then(
        ([first, second, third, fourth]) => resolve([[first, rowIndex], [second, rowIndex], [third, rowIndex], [fourth, rowIndex]])
    ).catch((reason) => { reject(reason) })
});

export const diagonalTopLeftToBottomRightConnectedPositions = (board: Board, position: CellPosition) => new Promise<CellPosition[] | null>((resolve, reject) => {
    const [columnIndex, rowIndex] = position;
    const { collection, index } = getDiagonalTopLeftToBottomRight(board, position);

    return hasConnectedFour(collection, index).then(
        (indexesInCollection) => {
            const positionsInBoard = indexesInCollection.map((i) => [columnIndex + i - index, rowIndex + i - index] as CellPosition);
            resolve(positionsInBoard)
        })
        .catch((reason) => { reject(reason) })
});

export const diagonalBottomLeftToTopRightConnectedPositions = (board: Board, position: CellPosition) => new Promise<CellPosition[] | null>((resolve, reject) => {
    const [columnIndex, rowIndex] = position;
    const { collection, index } = getDiagnalBottomLeftToTopRight(board, position);

    return hasConnectedFour(collection, index).then(
        (indexesInCollection) => {
            const positionsInBoard = indexesInCollection.map((i) => [columnIndex + i - index, rowIndex - i + index] as CellPosition);
            resolve(positionsInBoard)
        })
        .catch((reason) => { reject(reason) })
});

export function connectedPositions(board: Board, position: CellPosition) {
    return Promise.any([
        verticallyConnectedPositions(board, position),
        horizontallyConnectedPositions(board, position),
        diagonalBottomLeftToTopRightConnectedPositions(board, position),
        diagonalTopLeftToBottomRightConnectedPositions(board, position)
    ]);
}

export function getRow(board: Board, index: number) {
    return board.reduce((row, currColumn) => {
        return [...row, (currColumn[index])];
    }, [])
}

export function getDiagonalTopLeftToBottomRight(board: Board, pos: CellPosition) {
    const [colIndex, rowIndex] = pos;

    const left: Cell[] = [];
    const right: Cell[] = [];

    let col = colIndex;
    let row = rowIndex;
    while (0 <= col && 0 <= row) {
        col--;
        row--;
        if (0 <= col && col < 7 && 0 <= row && row < 6) {
            left.unshift(board[col][row]);
        }
    }

    col = colIndex;
    row = rowIndex;
    while (col < 7 && row < 6) {
        col++;
        row++;
        if (0 <= col && col < 7 && 0 <= row && row < 6) {
            right.push(board[col][row]);
        }
    }

    return {
        collection: [
            ...left,
            board[colIndex][rowIndex],
            ...right
        ],
        index: left.length
    }
}

export function getDiagnalBottomLeftToTopRight(board: Board, pos: CellPosition) {
    const [colIndex, rowIndex] = pos;

    const left: Cell[] = [];
    const right: Cell[] = [];

    let col = colIndex;
    let row = rowIndex;
    while (0 <= col && 0 <= row) {
        col--;
        row++;
        if (0 <= col && col < 7 && 0 <= row && row < 6) {
            left.unshift(board[col][row]);
        }
    }

    col = colIndex;
    row = rowIndex;
    while (col < 7 && row < 6) {
        col++;
        row--;
        if (0 <= col && col < 7 && 0 <= row && row < 6) {
            right.push(board[col][row]);
        }
    }

    return {
        collection: [
            ...left,
            board[colIndex][rowIndex],
            ...right
        ],
        index: left.length
    }
}

