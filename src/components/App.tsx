import { useEffect, useReducer, useState } from 'react'
import RuleDialog from './RuleDialog/RuleDialog';
import MainMenu from './MainMenu/MainMenu';
import MainPage from './MainPage/MainPage';
import PauseDialog from './PauseDialog/PauseDialog';

type GameState = 'IDLE' | 'IN_GAME' | 'PAUSED';

type GameStateActionType = 'START' | 'RESTART' | 'PAUSE' | 'CONTINUE' | 'QUIT';

type GameStateAction = {
  type: GameStateActionType
}

function gameStateReducer(gameState: GameState, action: GameStateAction): GameState {
  const validTransitions: { [key in GameStateActionType]: GameState[] } = {
    'START': ['IDLE'],
    'RESTART': ['IN_GAME', 'PAUSED'],
    'CONTINUE': ['PAUSED'],
    'PAUSE': ['IN_GAME'],
    'QUIT': ['PAUSED']
  };

  if (!validTransitions[action.type].includes(gameState)) {
    console.error(`invalid action:${action.type} state:${gameState}`);
    return gameState;
  }

  switch (action.type) {
    case 'START': return 'IN_GAME';
    case 'RESTART': return 'IN_GAME';
    case 'CONTINUE': return 'IN_GAME';
    case 'PAUSE': return 'PAUSED';
    case 'QUIT': return 'IDLE';
  }
}

const playerIds = [1, 2] as const
type Player = {
  id: typeof playerIds[number],
  score: number
};

export type BoardCell = null | Player["id"];

type InGameState = {
  currentPlayer: Player["id"],
  timer: number,
  players: Player[],
  board: BoardCell[][]
}

type DropAction = {
  type: "DROP",
  columnIndex: number
}
type TimeOffAction = {
  type: "TIME-OFF"
}
type InGameStateAction = DropAction | TimeOffAction;

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



function App() {
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  const initialGameState: GameState = 'IN_GAME';
  const [gameState, dispatchGameState] = useReducer(gameStateReducer, initialGameState);

  const initialBoard: BoardCell[][] = Array(7).fill(Array(6).fill(null));
  const initialInGameState: InGameState = {
    board: initialBoard,
    currentPlayer: 1,
    players: [{ id: 1, score: 0 }, { id: 2, score: 0 }],
    timer: 30
  }
  const [inGameState, dispatchInGameState] = useReducer(inGameStateReducer, initialInGameState);
  const { board, currentPlayer, players, timer } = inGameState;


  useEffect(() => { console.log(renderBoard(board)); console.log(board) }, [board]);

  return (
    <>
      <div className="App">
        {(gameState === 'IDLE') ? (
          <MainMenu
            startGame={() => { dispatchGameState({ type: 'START' }) }}
            // startGame={() => { dispatchInGameState({ type: 'DROP', columnIndex: Math.floor(Math.random() * 7) }) }}  // TODO delete this
            openRules={() => { setIsRulesOpen(true) }} />
        ) : (
          <MainPage pause={() => dispatchGameState({ type: 'PAUSE' })} restart={() => dispatchGameState({ type: 'RESTART' })} />
        )
        }
      </div>
      <RuleDialog isOpen={isRulesOpen} closeDialog={() => setIsRulesOpen(false)} />
      <PauseDialog
        isOpen={gameState === 'PAUSED'}
        continueGame={() => dispatchGameState({ type: 'CONTINUE' })}
        quit={() => dispatchGameState({ type: 'QUIT' })}
        restart={() => dispatchGameState({ type: 'RESTART' })} />
    </>
  )
}


function renderBoard(board: BoardCell[][]) {
  const numRows = board.length;
  const numCols = board[0].length;
  let output = '';

  const transposedBoard = [];
  for (let col = 0; col < numCols; col++) {
    const transposedRow = [];
    for (let row = 0; row < numRows; row++) {
      transposedRow.push(board[row][col]);
    }
    transposedBoard.push(transposedRow);
  }

  for (let row = 0; row < numCols; row++) {
    for (let col = 0; col < numRows; col++) {
      const cellValue = transposedBoard[row][col];
      let cellString;

      if (cellValue === 1) {
        cellString = 'X';
      } else if (cellValue === 2) {
        cellString = 'O';
      } else {
        cellString = '-';
      }

      output += `| ${cellString} `;
    }

    output += '|\n';
  }

  return output;
}

function drop(board: BoardCell[][], currentPlayer: Player["id"], columnIndex: number): BoardCell[][] {
  if (columnIndex > 6) {
    console.error(`invalid column number ${columnIndex}`);
    return board;
  }

  return board.map((column, index, board) => {
    if (index != columnIndex) return column;

    const firstFilledCellIndex = column.findIndex((cell) => cell !== null);
    const cellIndexToDropInto = (firstFilledCellIndex === -1) ? column.length - 1 : firstFilledCellIndex - 1;

    if (cellIndexToDropInto < 0) {
      console.error(`column ${columnIndex} is full`);
      return column;
    }

    const updatedColumn = [...column];
    updatedColumn[cellIndexToDropInto] = currentPlayer
    return updatedColumn;
  })
}

function togglePlayer(currentPlayer: Player["id"]): Player["id"] {
  return (currentPlayer === 1) ? 2 : 1;
}

export default App

