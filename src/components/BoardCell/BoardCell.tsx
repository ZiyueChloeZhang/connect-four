import React from 'react'
import { CellValue, ColNum, RowNum } from '../../shared/interfaces'
import counterRedLarge from '../../assets/counter-red-large.svg';
import counterYellowLarge from '../../assets/counter-yellow-large.svg';
import counterRedSmall from '../../assets/counter-red-small.svg';
import counterYellowSmall from '../../assets/counter-yellow-small.svg';

type BoardCellProps = {
    rowNum: RowNum,
    colNum: ColNum,
    cellValue: CellValue
}

const BoardCell: React.FC<BoardCellProps> = ({ rowNum, colNum, cellValue }) => {
    return (
        <span className='board-cell' data-col={colNum} data-row={rowNum} data-value={0}>
            {(cellValue === 1) && (
                <picture>
                    <source media="(min-width:768px)" srcSet={counterRedLarge} />
                    <img src={counterRedSmall} alt="board layer white" />
                </picture>
            )}
            {(cellValue === 2) && (
                <picture>
                    <source media="(min-width:768px)" srcSet={counterYellowLarge} />
                    <img src={counterYellowSmall} alt="board layer white" />
                </picture>
            )}
        </span>
    )
}

export default BoardCell