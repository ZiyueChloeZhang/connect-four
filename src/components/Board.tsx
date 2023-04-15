import boardLayerWhiteLarge from "../assets/board-layer-white-large.svg";
import boardLayerWhiteSmall from "../assets/board-layer-white-small.svg";
import boardLayerBlackLarge from "../assets/board-layer-black-large.svg";
import boardLayerBlackSmall from "../assets/board-layer-black-small.svg";
import React, { FC } from "react";
import BoardCell from "./BoardCell";
import { CellValue } from "../shared/GameContext";

type BoardProps = {
    board: CellValue[][],
}
const Board: FC<BoardProps> = ({board}) => {
    return <>
        <picture>
            <source media="(min-width:768px)" srcSet={boardLayerWhiteLarge}/>
            <img src={boardLayerWhiteSmall} alt="board layer white"/>
        </picture>
        <div id='virtual-board'>
            {board.map((row, colNum) => (
                <div key={`column-${colNum}`} className='board-column'>
                    {row.map((cell, rowNum) => (
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