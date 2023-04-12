import connectFourLogo from '../../assets/logo.svg';
import playerVsPlayerIcon from '../../assets/player-vs-player.svg';

type MainMenuProps = {
    startGame: () => void
    openRules: () => void
}

const MainMenu: React.FC<MainMenuProps> = ({ startGame, openRules }) => {
    return (
        <div className='menu-container' id="main-menu">
            <img src={connectFourLogo} alt="connect four logo" id='logo' />
            <div>
                <button className="yellowBtn iconBtn" onClick={startGame}>
                    <div>player vs player</div>
                    <img src={playerVsPlayerIcon} alt="player vs player icon" />
                </button>
                <button className='iconBtn' onClick={openRules}> game rules </button>
            </div>
        </div>
    )
}

export default MainMenu