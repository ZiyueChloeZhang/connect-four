import React from 'react';
import { useGameState } from "../shared/GameContext";


const Timer = () => {
    const { currentPlayer, timer } = useGameState();

    return (
        <div className={`timer ${(currentPlayer === "RED") ? 'pink' : 'yellow'}`}>
            <div className="player-name">player {currentPlayer === "RED" ? 1 : 2}'s turn</div>
            <div className="score">{timer.timeLeft}S</div>
        </div>
    );
};

export default Timer;