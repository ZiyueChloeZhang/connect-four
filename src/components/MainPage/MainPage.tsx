import React from 'react'
import connectFourLogo from '../../assets/logo.svg';
import playerOneIcon from '../../assets/player-one.svg';
import playerTwoIcon from '../../assets/player-two.svg';

type MainPageProps = {
    pause: () => void,
    restart: () => void
}

const MainPage: React.FC<MainPageProps> = ({ pause, restart }) => {
    return (
        <div id='main-page'>
            <nav>
                <button className='toolBtn' onClick={pause}>menu</button>
                <img src={connectFourLogo} alt="connect four logo" id='logo' />
                <button className='toolBtn' onClick={restart}>restart</button>
            </nav>
            <div className='score-boards'>
                <div className='score-board'>
                    <div className='score-info score-info-1'>
                        <div className='player-name'>player 1</div>
                        <div className='score'>12</div>
                    </div>
                    <img src={playerOneIcon} alt="player one icon" id='player-one-icon' />
                </div>
                <div className='score-board'>
                    <div className='score-info score-info-2'>
                        <div className='player-name'>player 2</div>
                        <div className='score'>23</div>
                    </div>
                    <img src={playerTwoIcon} alt="player two icon" id='player-two-icon' />
                </div>
            </div>
        </div>
    )
}

export default MainPage