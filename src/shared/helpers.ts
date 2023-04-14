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