import React from 'react'
import { CellValue, ColNum, RowNum } from '../../shared/interfaces'

type BoardCellProps = {
    rowNum: RowNum,
    colNum: ColNum,
    cellValue: CellValue
}

const BoardCell: React.FC<BoardCellProps> = ({ rowNum, colNum, cellValue }) => {
    return (
        <span className='board-cell' data-col={colNum} data-row={rowNum} data-value={0}></span>
    )
}

export default BoardCell