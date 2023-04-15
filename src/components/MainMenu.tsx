import connectFourLogo from '../assets/logo.svg';
import playerVsPlayerIcon from '../assets/player-vs-player.svg';
import React, { useState } from "react";
import RuleDialog from "./RuleDialog";
import { useGameDispatch } from "../shared/GameContext";

const MainMenu = () => {
    const dispatch = useGameDispatch();
    const [isRulesOpen, setIsRulesOpen] = useState(false);

    function startGame() {
        dispatch({type: "START"});
    }

    return <>
        <div className='menu-container' id="main-menu">
            <img src={connectFourLogo} alt="connect four logo" id='logo'/>
            <div>
                <button className="yellowBtn iconBtn" onClick={startGame}>
                    <div>player vs player</div>
                    <img src={playerVsPlayerIcon} alt="player vs player icon"/>
                </button>
                <button className='iconBtn' onClick={() => setIsRulesOpen(true)}> game rules</button>
            </div>
        </div>
        <RuleDialog isOpen={isRulesOpen} closeDialog={() => setIsRulesOpen(false)}/>
    </>
}

export default MainMenu