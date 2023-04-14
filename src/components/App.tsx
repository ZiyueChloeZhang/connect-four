import { useEffect, useReducer, useState } from 'react'
import RuleDialog from './RuleDialog/RuleDialog';
import MainMenu from './MainMenu/MainMenu';
import MainPage from './MainPage/MainPage';
import PauseDialog from './PauseDialog/PauseDialog';

// state
type GameState = 'IDLE' | 'IN_GAME' | 'PAUSED';

// actions
type GameStateActionType = 'START' | 'RESTART' | 'PAUSE' | 'CONTINUE' | 'QUIT';
type GameStateAction = {
  type: GameStateActionType
}

// reducer
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
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  const initialGameState: GameState = 'IN_GAME';
  const [gameState, dispatchGameState] = useReducer(gameStateReducer, initialGameState);

  return (
    <>
      <div className="App">
        {(gameState === 'IDLE') ? (
          <MainMenu
            startGame={() => { dispatchGameState({ type: 'START' }) }}
            openRules={() => { setIsRulesOpen(true) }} />
        ) : (
          <MainPage
            pause={() => dispatchGameState({ type: 'PAUSE' })}
            restart={() => dispatchGameState({ type: 'RESTART' })}
          />
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

export default App

