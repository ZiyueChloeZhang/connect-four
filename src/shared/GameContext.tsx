import { createContext, Dispatch, FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import { Color, Board, Game } from './gameEngine';

type GameStatus = 'IDLE' | 'IN_GAME' | 'PAUSED';
type PlayerScores = { [key in Color]: number };
type Timer = {
    isOn: boolean,
    timeLeft: number
}
export type CoinPosition = {
    col: number,
    row: number
}
type GameState = {
    status: GameStatus
    currentPlayer: Color,
    timer: Timer,
    playerScores: PlayerScores,
} & Game;

const initialTimer: Timer = {
    isOn: false,
    timeLeft: 5
}
const initialBoard: Board = Array(7).fill(Array(6).fill(null));
const initialPlayerScores: PlayerScores = { "RED": 0, "YELLOW": 0 };
const initialGameState: GameState = {
    board: initialBoard,
    currentPlayer: "RED",
    playerScores: initialPlayerScores,
    status: "IDLE",
    timer: initialTimer,
    connectedCellPositions: null,
    winner: null
}


type GameStatusActionType = 'START' | 'RESTART' | 'PAUSE' | 'CONTINUE' | 'QUIT';
type GameStatusAction = {
    type: GameStatusActionType
}

type TimerActionType = 'TIME-OFF' | "TICK"
type TimerAction = {
    type: TimerActionType
}

export type GameAction = GameStatusAction
    | TimerAction
    | { type: "DROP", payload: Game }

const gameStateReducer = (gameState: GameState, action: GameAction): GameState => {
    const { currentPlayer, playerScores, status, timer } = gameState;
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
            const { board, connectedCellPositions, winner } = action.payload;
            return {
                ...gameState,
                board: board,
                currentPlayer: currentPlayer === "RED" ? "YELLOW" : "RED",
                timer: {
                    isOn: !winner,
                    timeLeft: initialTimer.timeLeft
                },
                connectedCellPositions: connectedCellPositions,
                winner: winner,
                status: winner ? "IDLE" : "IN_GAME"
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
            const opponent = currentPlayer === "RED" ? "YELLOW" : "RED";
            const opponentUpdatedScore = playerScores[opponent] + 1;
            return {
                ...gameState,
                playerScores: { ...playerScores, [opponent]: opponentUpdatedScore },
                currentPlayer: opponent,
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

export const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [game, dispatch] = useReducer(gameStateReducer, initialGameState);
    const { timer } = game;

    useEffect(() => {
        if (timer.isOn) {
            const interval = setInterval(() => {
                dispatch({ type: "TICK" });
                if (timer.timeLeft === 1) dispatch({ type: "TIME-OFF" });
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

