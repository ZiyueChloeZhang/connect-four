import React from 'react'
import connectFourLogo from '../../assets/logo.svg';
import playerOneIcon from '../../assets/player-one.svg';
import playerTwoIcon from '../../assets/player-two.svg';
import boardLayerWhiteLarge from '../../assets/board-layer-white-large.svg';
import boardLayerWhiteSmall from '../../assets/board-layer-white-small.svg';

type MainPageProps = {
    pause: () => void,
    restart: () => void
}

const MainPage: React.FC<MainPageProps> = ({ pause, restart }) => {
    return (
        <>
            <nav>
                <button className='toolBtn' onClick={pause}>menu</button>
                <img src={connectFourLogo} alt="connect four logo" id='logo' />
                <button className='toolBtn' onClick={restart}>restart</button>
            </nav>
            <main>
                <div className='score-board'>
                    <div>
                        <div className='player-name'>player 1</div>
                        <div className='score'>12</div>
                    </div>
                    <img src={playerOneIcon} alt="player one icon" id='player-one-icon' />
                </div>
                <div id="game-board">
                    <picture>
                        <source media="(min-width:768px)" srcSet={boardLayerWhiteLarge} />
                        <img src={boardLayerWhiteSmall} alt="board layer white" />
                    </picture>
                </div>
                <div className='score-board'>
                    <div>
                        <div className='player-name'>player 2</div>
                        <div className='score'>23</div>
                    </div>
                    <img src={playerTwoIcon} alt="player two icon" id='player-two-icon' />
                </div>
            </main>
        </>
    )
}

export default MainPage