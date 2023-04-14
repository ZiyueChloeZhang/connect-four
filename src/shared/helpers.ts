import { CellValue, PlayerId } from "./interfaces";

export function drop(board: CellValue[][], currentPlayer: PlayerId, columnIndex: number): CellValue[][] {
    if (columnIndex > 6) {
        console.error(`invalid column number ${columnIndex}`);
        return board;
    }

    return board.map((column, index, board) => {
        if (index != columnIndex) return column;

        const firstFilledCellIndex = column.findIndex((cell) => cell !== null);
        const cellIndexToDropInto = (firstFilledCellIndex === -1) ? column.length - 1 : firstFilledCellIndex - 1;

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

export function flatten(array: any[][]): { row: number, col: number, value: any }[] {
    return array.reduce((flattenedArr, col, colIndex) => {
        return [...flattenedArr, ...col.map((value, rowIndex) => ({ col: colIndex, row: rowIndex, value }))];
    }, []);
};

export function renderBoard(board: CellValue[][]) {
    const numRows = board.length;
    const numCols = board[0].length;
    let output = '';

    const transposedBoard = [];
    for (let col = 0; col < numCols; col++) {
        const transposedRow = [];
        for (let row = 0; row < numRows; row++) {
            transposedRow.push(board[row][col]);
        }
        transposedBoard.push(transposedRow);
    }

    for (let row = 0; row < numCols; row++) {
        for (let col = 0; col < numRows; col++) {
            const cellValue = transposedBoard[row][col];
            let cellString;

            if (cellValue === 1) {
                cellString = 'X';
            } else if (cellValue === 2) {
                cellString = 'O';
            } else {
                cellString = '-';
            }

            output += `| ${cellString} `;
        }

        output += '|\n';
    }

    return output;
}