import { createContext, Dispatch, FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import { drop, togglePlayer } from "./helpers";

type GameStatus = 'IDLE' | 'IN_GAME' | 'PAUSED';
export type PlayerId = 1 | 2;
type PlayerScores = { [key in PlayerId]: number };
export type CellValue = null | PlayerId;
type Timer = {
    isOn: boolean,
    timeLeft: number
}
type GameState = {
    status: GameStatus
    currentPlayer: PlayerId,
    timer: Timer,
    playerScores: PlayerScores,
    board: CellValue[][]
}

const initialTimer: Timer = {
    isOn: false,
    timeLeft: 5
}
const initialBoard: CellValue[][] = Array(7).fill(Array(6).fill(null));
const initialPlayerScores: PlayerScores = {"1": 0, "2": 0};
const initialGameState: GameState = {
    board: initialBoard,
    currentPlayer: 1,
    playerScores: initialPlayerScores,
    status: "IDLE",
    timer: initialTimer
}


type GameStatusActionType = 'START' | 'RESTART' | 'PAUSE' | 'CONTINUE' | 'QUIT';
type GameStatusAction = {
    type: GameStatusActionType
}

type TimerActionType = 'TIME-OFF' | "TICK"
type TimerAction = {
    type: TimerActionType
}

type GameAction = GameStatusAction
    | TimerAction
    | { type: "DROP", columnIndex: number }

const gameStateReducer = (gameState: GameState, action: GameAction): GameState => {
    const {board, currentPlayer, playerScores, status, timer} = gameState;
    switch (action.type) {
        case "CONTINUE": {
            return {
                ...gameState,
                status: "IN_GAME",
                timer: {
                    ...timer,
                    isOn: true
                }
            }
        }
        case "DROP": {
            const {columnIndex} = action;
            const updatedBoard = drop(board, currentPlayer, columnIndex);
            return {
                ...gameState,
                board: updatedBoard,
                currentPlayer: togglePlayer(currentPlayer),
                timer: {
                    isOn: true,
                    timeLeft: initialTimer.timeLeft
                }
            }
        }
        case "PAUSE": {
            return {
                ...gameState,
                status: "PAUSED",
                timer: {
                    ...timer,
                    isOn: false
                }
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
                timer: {
                    isOn: true,
                    timeLeft: initialTimer.timeLeft
                }
            }
        }
        case "START": {
            return {
                ...gameState,
                status: "IN_GAME",
                timer: {
                    isOn: true,
                    timeLeft: initialTimer.timeLeft
                }
            }
        }
        case "TIME-OFF": {
            const opponentId = togglePlayer(currentPlayer);
            const opponentUpdatedScore = playerScores[opponentId] + 1;
            return {
                ...gameState,
                playerScores: {...playerScores, [opponentId]: opponentUpdatedScore},
                currentPlayer: opponentId,
                timer: {
                    ...timer,
                    timeLeft: initialTimer.timeLeft
                }
            }
        }
        case "TICK": {
            return {
                ...gameState,
                timer: {
                    ...timer,
                    timeLeft: timer.timeLeft - 1
                }
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
    const {timer} = game;

    useEffect(() => {
        if (timer.isOn) {
            const interval = setInterval(() => {
                dispatch({type: "TICK"});
                if (timer.timeLeft === 1) dispatch({type: "TIME-OFF"});
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

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

