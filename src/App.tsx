import { useReducer } from 'react'
import reactLogo from './assets/react.svg'
import playerVsPlayerIcon from './assets/player-vs-player.svg';
import connectFourLogo from './assets/logo.svg';
import './sass/main.scss'

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


function App() {
  const initialGameState: GameState = 'IDLE';
  const [gameState, dispatch] = useReducer(gameStateReducer, initialGameState);

  return (
    <div className="App">
      <div>current state: <b>{gameState}</b></div>
      <div className='menu-container main-menu'>
        <img src={connectFourLogo} alt="connect four logo" id='logo' />
        <div>
          <button className="yellowBtn iconBtn" onClick={() => { dispatch({ type: 'START' }) }}>
            <div>player vs player</div>
            <img src={playerVsPlayerIcon} alt="player vs player icon" />
          </button>
          <button className='iconBtn'> game rules </button>
        </div>
      </div>
    </div>

  )
}

export default App
