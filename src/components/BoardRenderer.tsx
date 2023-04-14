import React from 'react';
import { BoardCell } from './App';

interface BoardRendererProps {
    board: BoardCell[][];
}

const BoardRenderer: React.FC<BoardRendererProps> = ({ board }) => {
    const numRows = board.length;
    const numCols = board[0].length;

    const renderCell = (cell: BoardCell) => {
        if (cell === 1) {
            return 'X';
        } else if (cell === 2) {
            return 'O';
        } else {
            return '-';
        }
    };

    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <div className="cell" key={colIndex}>
                            {renderCell(cell)}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default BoardRenderer;
