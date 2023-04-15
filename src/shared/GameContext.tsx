import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from 'react';
import { drop, togglePlayer } from "./helpers";

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

const initialBoard: CellValue[][] = Array(7).fill(Array(6).fill(null));
const initialPlayerScores: PlayerScores = {"1": 0, "2": 0};
const initialGameState: GameState = {
    board: initialBoard,
    currentPlayer: 1,
    playerScores: initialPlayerScores,
    status: "IDLE",
    timer: 30
}


type GameStatusActionType = 'START' | 'RESTART' | 'PAUSE' | 'CONTINUE' | 'QUIT';
type GameStatusAction = {
    type: GameStatusActionType
}

type GameAction = GameStatusAction
    | { type: "DROP", columnIndex: number }
    | { type: "TIME-OFF" }

const gameStateReducer = (gameState: GameState, action: GameAction): GameState => {
    const {board, currentPlayer, playerScores, status, timer} = gameState;
    switch (action.type) {
        case "CONTINUE": {
            return {
                ...gameState,
                status: "IN_GAME"
                // TODO continue timer
            }
        }
        case "DROP": {
            const {columnIndex} = action;
            return {
                ...gameState,
                board: drop(board, currentPlayer, columnIndex),
                currentPlayer: togglePlayer(currentPlayer),
                // TODO reset timer
                // TODO checkWin
            }
        }
        case "PAUSE": {
            return {
                ...gameState,
                status: "PAUSED",
                // TODO pause timer
            }
        }
        case "QUIT": {
            return initialGameState;
        }
        case "RESTART": {
            return {
                ...gameState,
                board: initialBoard,
                playerScores: initialPlayerScores,
                status: "IN_GAME",
                // todo reset timer
            }
        }
        case "START": {
            return {
                ...gameState,
                status: "IN_GAME",
                // todo start timer
            }
        }
        case "TIME-OFF": {
            const opponentId = togglePlayer(currentPlayer);
            const opponentUpdatedScore = playerScores[opponentId] + 1;
            return {
                ...gameState,
                playerScores: {...playerScores, [opponentId]: opponentUpdatedScore},
                currentPlayer: opponentId,
                //todo restart timer
            }
        }
        default:
            return gameState
    }
}


const GameContext = createContext<GameState>(initialGameState);
const GameDispatchContext = createContext<Dispatch<GameAction>>(() => {
});

export const GameProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [game, dispatch] = useReducer(gameStateReducer, initialGameState);

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

