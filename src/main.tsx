import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './sass/main.scss';
import { GameProvider } from "./shared/GameContext";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <GameProvider>
            <App/>
        </GameProvider>
    </React.StrictMode>,
)
