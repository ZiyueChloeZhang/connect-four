import playerOneIcon from "../assets/player-one.svg";
import playerTwoIcon from '../assets/player-two.svg';
import React from "react";
import { PlayerId } from "../shared/GameContext";

type ScoreBoardProps = {
    playerId: PlayerId,
    score: number
}
const ScoreBoard: React.FC<ScoreBoardProps> = ({playerId, score}) => {
    return <>
        <div className="score-info">
            <div className="player-name">player {playerId}</div>
            <div className="score">{score}</div>
        </div>
        {(playerId === 1) && <img src={playerOneIcon} alt={`player ${playerId} icon`} className="player-icon"/>}
        {(playerId === 2) && <img src={playerTwoIcon} alt={`player ${playerId} icon`} className="player-icon"/>}
    </>;
}

export default ScoreBoard;