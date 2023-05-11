import { CellValue, CoinPosition, PlayerId } from "./GameContext";

function findRowIndexToDropInto(column: CellValue[]) {
    const firstFilledCellIndex = column.findIndex((cell) => cell !== null);
    return (firstFilledCellIndex === -1) ? column.length - 1 : firstFilledCellIndex - 1;
}

export function drop(board: CellValue[][], currentPlayer: PlayerId, columnIndex: number): CellValue[][] {
    if (columnIndex > 6) {
        console.error(`invalid column number ${columnIndex}`);
        return board;
    }

    return board.map((column, index, board) => {
        if (index != columnIndex) return column;
        const cellIndexToDropInto = findRowIndexToDropInto(column);

        if (cellIndexToDropInto < 0) {
            console.error(`column ${columnIndex} is full`);
            return column;
        }

        const updatedColumn = [...column];
        updatedColumn[cellIndexToDropInto] = currentPlayer
        return updatedColumn;
    })
}

export function togglePlayer(currentPlayer: PlayerId): PlayerId {
    return (currentPlayer === 1) ? 2 : 1;
}

export function findConnected(board: CellValue[][], columnIndex: number, coin: PlayerId): CoinPosition[] {
    // check column
    const column = board[columnIndex];
    const rowIndex = findRowIndexToDropInto(column);
    if (rowIndex < 3) { // there are at least 3 more coins underneath the newly dropped coin to check
        const [one, two, three] = [rowIndex + 1, rowIndex + 2, rowIndex + 3];
        if ((column[one] === coin)
            && (column[two] === coin)
            && (column[three] === coin)) {
            return [
                { col: columnIndex, row: rowIndex },
                { col: columnIndex, row: one },
                { col: columnIndex, row: two },
                { col: columnIndex, row: three }
            ]
        }
    }

    // check row
    const row = board.reduce((row, currColumn) => {
        return [...row, (currColumn[rowIndex])];
    }, [])
    row[columnIndex] = coin;

    for (let i = 0; i < row.length - 4; i++) {
        if (checkNextN(row, i, coin, 4)) break;
    }
    let i = 0;
    while (i < row.length - 4) {
        if (checkNextN(row, i, coin, 4)) {
            break;
        } else {
            i++;
        }
    }
    if (i !== row.length - 4) {
        return [
            { col: i, row: rowIndex },
            { col: i + 1, row: rowIndex },
            { col: i + 2, row: rowIndex },
            { col: i + 3, row: rowIndex }
        ]
    }

    // check diagnal up

    return [];

    function checkNextN(row: CellValue[], index: number, coin: PlayerId, n: number): boolean {
        let result = true;
        for (let i = 0; i < n; i++) {
            result = result && (row[index + i] === coin)
        }
        return result;
    }
}

export const getDiagnalUp = (board: CellValue[][], coinPos: CoinPosition) => {
    return true;
}

export const sum = (a: number, b: number) => {
    return a + b;
}