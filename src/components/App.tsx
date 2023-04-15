import MainMenu from './MainMenu';
import MainPage from './MainPage';
import { useGameState } from "../shared/GameContext";

function App() {
    const {status} = useGameState();
    return <>
        <div className="App">
            {(status === 'IDLE') ? <MainMenu/> : <MainPage/>}
        </div>
    </>

}

export default App

