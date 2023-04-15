import boardLayerWhiteLarge from "../assets/board-layer-white-large.svg";
import boardLayerWhiteSmall from "../assets/board-layer-white-small.svg";
import boardLayerBlackLarge from "../assets/board-layer-black-large.svg";
import boardLayerBlackSmall from "../assets/board-layer-black-small.svg";
import React, { FC } from "react";
import BoardCell from "./BoardCell";
import { CellValue, useGameDispatch } from "../shared/GameContext";

type BoardProps = {
    board: CellValue[][],
}

const VirtualColumn: FC<{ index: number }> = ({index}) => {
    const dispatch = useGameDispatch();

    function dropCoin() {
        console.log('clicked')
        dispatch({type: "DROP", columnIndex: index});
    }

    return <div className='virtual-column' onClick={dropCoin}/>
}
const Board: FC<BoardProps> = ({board}) => {
    return <>
        <picture>
            <source media="(min-width:768px)" srcSet={boardLayerWhiteLarge}/>
            <img src={boardLayerWhiteSmall} alt="board layer white"/>
        </picture>
        <div id='virtual-columns'>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (<VirtualColumn key={`virtual-column-${i}`} index={i}/>))}
        </div>
        <div id='virtual-board'>
            {board.map((column, colNum) => (
                <div key={`column-${colNum}`} className='board-column'>
                    {column.map((cell, rowNum) => (
                        <BoardCell key={`row-${rowNum}`} cellValue={cell}/>
                    ))}
                </div>)
            )}
        </div>
        <picture>
            <source media="(min-width:768px)" srcSet={boardLayerBlackLarge}/>
            <img src={boardLayerBlackSmall} alt="board layer white"/>
        </picture>
    </>;
}

export default Board;