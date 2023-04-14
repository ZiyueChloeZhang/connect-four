import React, {useReducer} from 'react'
import connectFourLogo from '../assets/logo.svg';
import playerOneIcon from '../assets/player-one.svg';
import playerTwoIcon from '../assets/player-two.svg';
import boardLayerWhiteLarge from '../assets/board-layer-white-large.svg';
import boardLayerWhiteSmall from '../assets/board-layer-white-small.svg';
import boardLayerBlackLarge from '../assets/board-layer-black-large.svg';
import boardLayerBlackSmall from '../assets/board-layer-black-small.svg';
import {drop, togglePlayer} from '../shared/helpers';
import {CellValue, EMPTY_BOARD, PlayerId, PlayerScores} from '../shared/interfaces';
import BoardCell from './BoardCell';

type MainPageProps = {
    pause: () => void,
    restart: () => void
}


// actions
type DropAction = {
    type: "DROP",
    columnIndex: number
}
type TimeOffAction = {
    type: "TIME-OFF"
}
type InGameStateAction = DropAction | TimeOffAction;

// states
type InGameState = {
    currentPlayer: PlayerId,
    timer: number,
    playerScores: PlayerScores,
    board: CellValue[][]
}

const initialInGameState: InGameState = {
    board: EMPTY_BOARD,
    currentPlayer: 1,
    playerScores: {"1": 0, "2": 0},
    timer: 30
} as const;

// reducer
function inGameStateReducer(inGameState: InGameState, action: InGameStateAction): InGameState {
    switch (action.type) {
        case 'DROP': {
            const {currentPlayer, board} = inGameState;
            const {columnIndex} = action;

            const updatedBoard = drop(board, currentPlayer, columnIndex);


            return {
                ...inGameState,
                board: updatedBoard,
                currentPlayer: togglePlayer(currentPlayer),
            }; // TODO remove stub
        }

        case 'TIME-OFF':

        default:
            return inGameState;
    }
}

const MainPage: React.FC<MainPageProps> = ({pause, restart}) => {
    const [{board, currentPlayer, playerScores, timer}, dispatch] = useReducer(inGameStateReducer, initialInGameState);

    return (
        <>
            <nav>
                <button className='toolBtn' onClick={pause}>menu</button>
                <img src={connectFourLogo} alt="connect four logo" id='logo'/>
                {/* <button className='toolBtn' onClick={restart}>restart</button> */}
                <button className='toolBtn'
                        onClick={() => dispatch({type: 'DROP', columnIndex: Math.floor(Math.random() * 7)})}>
                    FUN
                </button>
            </nav>
            <main>
                <div className='score-board' id='one'>
                    <div className='score-info'>
                        <div className='player-name'>player 1</div>
                        <div className='score'>{playerScores[1]}</div>
                    </div>
                    <img src={playerOneIcon} alt="player one icon" className='player-icon'/>
                </div>
                <div id="game-board">
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
                </div>
                <div className='score-board' id='two'>
                    <div className='score-info'>
                        <div className='player-name'>player 2</div>
                        <div className='score'>{playerScores[2]}</div>
                    </div>
                    <img src={playerTwoIcon} alt="player two icon" className='player-icon'/>
                </div>
            </main>
        </>
    )
}

export default MainPage;