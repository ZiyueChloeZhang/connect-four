import boardLayerWhiteLarge from "../assets/board-layer-white-large.svg";
import boardLayerWhiteSmall from "../assets/board-layer-white-small.svg";
import boardLayerBlackLarge from "../assets/board-layer-black-large.svg";
import boardLayerBlackSmall from "../assets/board-layer-black-small.svg";
import markerRed from "../assets/marker-red.svg";
import markerYellow from "../assets/marker-yellow.svg";
import React, { FC, useState } from "react";
import BoardCell from "./BoardCell";
import { CellValue, useGameDispatch, useGameState } from "../shared/GameContext";

type BoardProps = {
    board: CellValue[][],
}

const VirtualColumns = () => {
    const dispatch = useGameDispatch();
    const {currentPlayer} = useGameState();

    const columns = [0, 1, 2, 3, 4, 5, 6];
    const [selectedColumn, setSelectedColumn] = useState(0);

    function dropCoin() {
        dispatch({type: "DROP", columnIndex: selectedColumn});
    }

    function selectColumn(index: number) {
        setSelectedColumn(index);
    }

    function renderMarker() {
        if (currentPlayer === 1) return <img className="marker" src={markerRed} alt="player one marker"/>
        if (currentPlayer === 2) return <img className="marker" src={markerYellow} alt="player two marker"/>
        return <></>
    }

    return <div id='virtual-columns'>
        {columns.map((i) =>
            (<div key={`column-${i}`} className='virtual-column' onClick={dropCoin} onMouseOver={() => selectColumn(i)}>
                {(selectedColumn === i) && renderMarker()}
            </div>)
        )}
    </div>
}
const Board: FC<BoardProps> = ({board}) => {

    return <>
        <picture>
            <source media="(min-width:768px)" srcSet={boardLayerWhiteLarge}/>
            <img src={boardLayerWhiteSmall} alt="board layer white"/>
        </picture>
        <VirtualColumns/>
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