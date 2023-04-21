import React from 'react';
import turnBackgroundRed from "../assets/turn-background-red.svg";
import turnBackgroundYellow from "../assets/turn-background-yellow.svg";
import { useGameState } from "../shared/GameContext";


const Timer = () => {
    const {currentPlayer, timer} = useGameState();

    function renderTurnBackground() {
        if (currentPlayer === 1) return <img className="marker" src={turnBackgroundRed} alt="player one turn"/>
        if (currentPlayer === 2) return <img className="marker" src={turnBackgroundYellow} alt="player two turn"/>
        return <></>
    }

    return (
        <div className={`timer ${(currentPlayer === 1) ? 'pink' : 'yellow'}`}>
            <div className="player-name">player {currentPlayer}'s turn</div>
            <div className="score">{timer.timeLeft}S</div>
        </div>
    );
};

export default Timer;