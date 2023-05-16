import React from 'react'
import counterRedLarge from '../assets/counter-red-large.svg';
import counterYellowLarge from '../assets/counter-yellow-large.svg';
import counterRedSmall from '../assets/counter-red-small.svg';
import counterYellowSmall from '../assets/counter-yellow-small.svg';
import { Cell } from '../shared/gameEngine';

type BoardCellProps = {
    cellValue: Cell
}

const BoardCell: React.FC<BoardCellProps> = ({ cellValue }) => {
    return (
        <span className='board-cell' data-aria-valuenow={cellValue}>
            {(cellValue === "RED") && (
                <picture>
                    <source media="(min-width:768px)" srcSet={counterRedLarge} />
                    <img src={counterRedSmall} alt="board layer white" />
                </picture>
            )}
            {(cellValue === "YELLOW") && (
                <picture>
                    <source media="(min-width:768px)" srcSet={counterYellowLarge} />
                    <img src={counterYellowSmall} alt="board layer white" />
                </picture>
            )}
        </span>
    )
}

export default BoardCell