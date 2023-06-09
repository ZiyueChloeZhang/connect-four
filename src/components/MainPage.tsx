import React from 'react'
import connectFourLogo from '../assets/logo.svg';
import ScoreBoard from "./ScoreBoard";
import Board from "./Board";
import PauseDialog from "./PauseDialog";
import { useGameDispatch, useGameState } from "../shared/GameContext";

const MainPage = () => {
    const { board, playerScores } = useGameState();
    const dispatch = useGameDispatch();

    function restartGame() {
        dispatch({ type: "RESTART" })
    }

    function pauseGame() {
        dispatch({ type: "PAUSE" });
    }

    return (
        <>
            <nav>
                <button className='toolBtn' onClick={pauseGame}>menu
                </button>
                <img src={connectFourLogo} alt="connect four logo" id='logo' />
                <button className='toolBtn' onClick={restartGame}>restart</button>
                {/*<button className='toolBtn' onClick={dropCoin}>FUN</button>*/}
            </nav>
            <main>
                <div className='score-board' id='one'>
                    <ScoreBoard score={playerScores["RED"]} playerId={"RED"} />
                </div>
                <div id="game-board">
                    <Board board={board} />
                </div>
                <div className='score-board' id='two'>
                    <ScoreBoard score={playerScores["YELLOW"]} playerId={"YELLOW"} />
                </div>
            </main>
            <PauseDialog restart={restartGame} />
        </>
    )
}

export default MainPage;