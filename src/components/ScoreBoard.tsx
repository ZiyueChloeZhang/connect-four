import playerOneIcon from "../assets/player-one.svg";
import playerTwoIcon from '../assets/player-two.svg';
import React from "react";
import { Color } from "../shared/gameEngine";

type ScoreBoardProps = {
    playerId: Color,
    score: number
}
const ScoreBoard: React.FC<ScoreBoardProps> = ({ playerId, score }) => {
    return <>
        <div className="score-info">
            <div className="player-name">player {playerId === "RED" ? 1 : 2}</div>
            <div className="score">{score}</div>
        </div>
        {(playerId === "RED") && <img src={playerOneIcon} alt={`player ${playerId} icon`} className="player-icon" />}
        {(playerId === "YELLOW") && <img src={playerTwoIcon} alt={`player ${playerId} icon`} className="player-icon" />}
    </>;
}

export default ScoreBoard;