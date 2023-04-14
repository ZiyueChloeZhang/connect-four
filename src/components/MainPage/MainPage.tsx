import React, { useReducer } from 'react'
import connectFourLogo from '../../assets/logo.svg';
import playerOneIcon from '../../assets/player-one.svg';
import playerTwoIcon from '../../assets/player-two.svg';
import boardLayerWhiteLarge from '../../assets/board-layer-white-large.svg';
import boardLayerWhiteSmall from '../../assets/board-layer-white-small.svg';
import { drop, togglePlayer } from '../../utils/helpers';
import { PlayerId, PlayerScores, BoardCell } from '../../utils/interfaces';

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
    board: BoardCell[][]
}

const initialBoard: BoardCell[][] = Array(7).fill(Array(6).fill(null));
const initialInGameState: InGameState = {
    board: initialBoard,
    currentPlayer: 1,
    playerScores: { "1": 0, "2": 0 },
    timer: 30
} as const;

// reducer
function inGameStateReducer(inGameState: InGameState, action: InGameStateAction): InGameState {
    switch (action.type) {
        case 'DROP': {
            const { currentPlayer, board } = inGameState;
            const { columnIndex } = action;

            const updatedBoard = drop(board, currentPlayer, columnIndex);


            return {
                ...inGameState,
                board: updatedBoard,
                currentPlayer: togglePlayer(currentPlayer),
            }; // TODO remove stub
        }

        case 'TIME-OFF':

        default: return inGameState;
    }
}

const MainPage: React.FC<MainPageProps> = ({ pause, restart }) => {
    const [inGameState, dispatchInGameState] = useReducer(inGameStateReducer, initialInGameState);
    const { board, currentPlayer, playerScores, timer } = inGameState;

    return (
        <>
            <nav>
                <button className='toolBtn' onClick={pause}>menu</button>
                <img src={connectFourLogo} alt="connect four logo" id='logo' />
                <button className='toolBtn' onClick={restart}>restart</button>
            </nav>
            <main>
                <div className='score-board'>
                    <div>
                        <div className='player-name'>player 1</div>
                        <div className='score'>{playerScores[1]}</div>
                    </div>
                    <img src={playerOneIcon} alt="player one icon" id='player-one-icon' />
                </div>
                <div id="game-board">
                    <picture>
                        <source media="(min-width:768px)" srcSet={boardLayerWhiteLarge} />
                        <img src={boardLayerWhiteSmall} alt="board layer white" />
                    </picture>
                </div>
                <div className='score-board'>
                    <div>
                        <div className='player-name'>player 2</div>
                        <div className='score'>{playerScores[2]}</div>
                    </div>
                    <img src={playerTwoIcon} alt="player two icon" id='player-two-icon' />
                </div>
            </main>
        </>
    )
}

export default MainPage