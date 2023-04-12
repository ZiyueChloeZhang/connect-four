import { useState } from 'react'
import reactLogo from './assets/react.svg'
import playerVsPlayerIcon from './assets/player-vs-player.svg';
import connectFourLogo from './assets/logo.svg';
import viteLogo from '/vite.svg'
import './sass/main.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className='menu-container main-menu'>
        <img src={connectFourLogo} alt="connect four logo" id='logo' />
        <div>
          <button className="yellowBtn iconBtn" >
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
