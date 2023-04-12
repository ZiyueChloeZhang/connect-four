import { useReducer, useState } from 'react'
import playerVsPlayerIcon from './assets/player-vs-player.svg';
import checkIcon from './assets/icon-check.svg';
import connectFourLogo from './assets/logo.svg';
import './sass/main.scss'
import { Dialog } from '@headlessui/react'
import RuleDialog from './components/RuleDialog/RuleDialog';
import MainMenu from './components/MainMenu/MainMenu';

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
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  return (
    <>
      <div className="App">
        <div>current state: <b>{gameState}</b></div>
        <div>isRulesOpen: <b>{isRulesOpen ? `true` : 'false'}</b></div>
        <MainMenu
          startGame={() => { dispatch({ type: 'START' }) }}
          openRules={() => { setIsRulesOpen(true) }}
        />
      </div>
      <RuleDialog isOpen={isRulesOpen} closeDialog={() => setIsRulesOpen(false)} />
    </>
  )
}

export default App
