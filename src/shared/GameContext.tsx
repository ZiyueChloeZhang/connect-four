import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from 'react';

type GameStatus = 'IDLE' | 'IN_GAME' | 'PAUSED';
export type PlayerId = 1 | 2;
type PlayerScores = { [key in PlayerId]: number };
export type CellValue = null | PlayerId;
type GameState = {
    status: GameStatus
    currentPlayer: PlayerId,
    timer: number,
    playerScores: PlayerScores,
    board: CellValue[][]
}

const initialBoard = Array(7).fill(Array(6).fill(null));
const initialGameState: GameState = {
    board: initialBoard,
    currentPlayer: 1,
    playerScores: {"1": 0, "2": 0},
    status: "IN_GAME",
    timer: 30
}


type GameStatusActionType = 'START' | 'RESTART' | 'PAUSE' | 'CONTINUE' | 'QUIT';
type GameStatusAction = {
    type: GameStatusActionType
}

type GameAction = GameStatusAction
    | { type: "DROP", columnIndex: number }
    | { type: "TIME-OFF" }

const gameStateReducer = (gameState: GameState, action: GameAction) => {
    return gameState;
}


const GameContext = createContext<GameState>(initialGameState);
const GameDispatchContext = createContext<Dispatch<GameAction>>(() => {
});
export const GameProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [game, dispatch] = useReducer(
        gameStateReducer,
        initialGameState
    );

    return (
        <GameContext.Provider value={game}>
            <GameDispatchContext.Provider value={dispatch}>
                {children}
            </GameDispatchContext.Provider>
        </GameContext.Provider>
    );
}

export function useGameState() {
    return useContext(GameContext);
}

export function useGameDispatch() {
    return useContext(GameDispatchContext);
}

// function inGameStateReducer(inGameState: InGameState, action: InGameStateAction): InGameState {
//     switch (action.type) {
//         case 'DROP': {
//             const {currentPlayer, board} = inGameState;
//             const {columnIndex} = action;
//
//             const updatedBoard = drop(board, currentPlayer, columnIndex);
//
//
//             return {
//                 ...inGameState,
//                 board: updatedBoard,
//                 currentPlayer: togglePlayer(currentPlayer),
//             }; // TODO remove stub
//         }
//
//         case 'TIME-OFF':
//
//         default:
//             return inGameState;
//     }
// }

// function gameStateReducer(gameState: GameState, action: GameStateAction): GameState {
//     const validTransitions: { [key in GameStateActionType]: GameState[] } = {
//         'START': ['IDLE'],
//         'RESTART': ['IN_GAME', 'PAUSED'],
//         'CONTINUE': ['PAUSED'],
//         'PAUSE': ['IN_GAME'],
//         'QUIT': ['PAUSED']
//     };
//
//     if (!validTransitions[action.type].includes(gameState)) {
//         console.error(`invalid action:${action.type} state:${gameState}`);
//         return gameState;
//     }
//
//     switch (action.type) {
//         case 'START':
//             return 'IN_GAME';
//         case 'RESTART':
//             return 'IN_GAME';
//         case 'CONTINUE':
//             return 'IN_GAME';
//         case 'PAUSE':
//             return 'PAUSED';
//         case 'QUIT':
//             return 'IDLE';
//     }
// }