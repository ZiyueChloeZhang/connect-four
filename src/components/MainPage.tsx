import React from 'react'
import connectFourLogo from '../assets/logo.svg';
import ScoreBoard from "./ScoreBoard";
import Board from "./Board";
import PauseDialog from "./PauseDialog";
import { useGameDispatch, useGameState } from "../shared/GameContext";

const MainPage = () => {
    const {board, playerScores} = useGameState();
    const dispatch = useGameDispatch();

    function dropCoin() {
        dispatch({
            type: "DROP",
            columnIndex: Math.floor(Math.random() * 7)
        })
    }

    function restartGame() {
        dispatch({
            type: "RESTART"
        })
    }

    return (
        <>
            <nav>
                <button className='toolBtn' onClick={() => {
                }}>menu
                </button>
                <img src={connectFourLogo} alt="connect four logo" id='logo'/>
                <button className='toolBtn' onClick={restartGame}>restart</button>
                <button className='toolBtn' onClick={dropCoin}>FUN</button>
            </nav>
            <main>
                <div className='score-board' id='one'>
                    <ScoreBoard score={playerScores[1]} playerId={1}/>
                </div>
                <div id="game-board">
                    <Board board={board}/>
                </div>
                <div className='score-board' id='two'>
                    <ScoreBoard score={playerScores[2]} playerId={2}/>
                </div>
            </main>
            <PauseDialog restart={restartGame}/>
        </>
    )
}

export default MainPage;