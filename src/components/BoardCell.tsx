import React, { useState } from 'react'
import counterRedLarge from '../assets/counter-red-large.svg';
import counterYellowLarge from '../assets/counter-yellow-large.svg';
import counterRedSmall from '../assets/counter-red-small.svg';
import counterYellowSmall from '../assets/counter-yellow-small.svg';
import { Cell } from '../shared/gameEngine';

type BoardCellProps = {
    cellValue: Cell,
    isWinningCell: boolean
}

const BoardCell: React.FC<BoardCellProps> = ({ cellValue, isWinningCell }) => {
    const [isWinningCellsDisplayed, setIsWinningCellsDisplayed] = useState(false);

    function displayWinningCells() {
        setIsWinningCellsDisplayed(true);
    }

    return (
        <span className='board-cell' data-aria-valuenow={cellValue} key={cellValue} onAnimationEnd={displayWinningCells} >
            {isWinningCellsDisplayed && isWinningCell && (
                <div className='winning-circle' />
            )}
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