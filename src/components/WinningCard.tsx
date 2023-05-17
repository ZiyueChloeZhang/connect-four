import React from 'react';
import { useGameDispatch, useGameState } from "../shared/GameContext";


const WinningCard = () => {
    const { winner } = useGameState();
    const dispatch = useGameDispatch();

    function startNextRound() {
        dispatch({ type: "NEXT_ROUND" });
    }

    return (
        <div className={'winning-card'}>
            <div className="player-name">player {winner === "RED" ? 1 : 2}</div>
            <div className="wins">WINS</div>
            <button className='toolBtn' onClick={startNextRound}>PLAY AGAIN</button>
        </div>
    );
};

export default WinningCard;