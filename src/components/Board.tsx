import boardLayerWhiteLarge from "../assets/board-layer-white-large.svg";
import boardLayerWhiteSmall from "../assets/board-layer-white-small.svg";
import boardLayerBlackLarge from "../assets/board-layer-black-large.svg";
import boardLayerBlackSmall from "../assets/board-layer-black-small.svg";
import markerRed from "../assets/marker-red.svg";
import markerYellow from "../assets/marker-yellow.svg";
import React, { Dispatch, FC, useEffect, useRef, useState } from "react";
import BoardCell from "./BoardCell";
import { GameAction, useGameDispatch, useGameState } from "../shared/GameContext";
import Timer from "./Timer";
import { Board as BoardType, CellPosition, makeAMove } from "../shared/gameEngine";
import WinningCard from "./WinningCard";

type BoardProps = {
    board: BoardType
}

const VirtualColumns = () => {
    const dispatch = useGameDispatch();
    const { currentPlayer, board } = useGameState();

    const columns = [0, 1, 2, 3, 4, 5, 6];
    const [selectedColumn, setSelectedColumn] = useState(0);

    useEffect(() => {
        function keyDownHandler({ key }: KeyboardEvent) {
            if (key === "ArrowRight") {
                setSelectedColumn((curr) => (curr === 6) ? 0 : curr + 1);
            }
            if (key === "ArrowLeft") {
                setSelectedColumn((curr) => (curr === 0) ? 6 : curr - 1);
            }
            if (key === "Enter") {
                dropCoin(selectedColumn, board, dispatch);
            }
        }

        window.addEventListener("keydown", keyDownHandler);
        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        };
    }, [selectedColumn]);

    async function dropCoin(index: number, board: BoardType, dispatch: Dispatch<GameAction>) {
        const { board: updatedBoard, connectedCellPositions, winner } = await makeAMove(currentPlayer, index, board)

        return dispatch({
            type: "DROP",
            payload: { board: updatedBoard, connectedCellPositions, winner }
        });
    }

    function selectColumn(index: number) {
        setSelectedColumn(index);
    }

    function renderMarker() {
        if (currentPlayer === "RED") return <img className="marker" src={markerRed} alt="player one marker" />
        if (currentPlayer === "YELLOW") return <img className="marker" src={markerYellow} alt="player two marker" />
        return <></>
    }

    return <div id='virtual-columns'>
        {columns.map((i) =>
        (<div
            key={`column-${i}`}
            className='virtual-column'
            onClick={() => dropCoin(selectedColumn, board, dispatch)}
            onMouseOver={() => selectColumn(i)}
        >
            {(selectedColumn === i) && renderMarker()}
        </div>)
        )}
    </div>
}

const Board: FC<BoardProps> = ({ board }) => {
    const { connectedCellPositions, status } = useGameState();

    return <>
        <picture>
            <source media="(min-width:768px)" srcSet={boardLayerWhiteLarge} />
            <img src={boardLayerWhiteSmall} alt="board layer white" />
        </picture>
        <VirtualColumns />
        <div id='virtual-board'>
            {board.map((column, colNum) => (
                <div key={`column-${colNum}`} className='board-column'>
                    {column.map((cell, rowNum) => (
                        <BoardCell key={`row-${rowNum}`} cellValue={cell}
                            isWinningCell={!!connectedCellPositions && connectedCellPositions.some(([col, row]) => col === colNum && row === rowNum)} />
                    ))}
                </div>)
            )}
        </div>
        <picture>
            <source media="(min-width:768px)" srcSet={boardLayerBlackLarge} />
            <img src={boardLayerBlackSmall} alt="board layer white" />
        </picture>
        {(status === "END")
            ? (<WinningCard />)
            : (<Timer />)}
    </>;
}

export default Board;