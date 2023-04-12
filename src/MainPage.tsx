import React from 'react'

type MainPageProps = {
    pause: () => void,
    restart: () => void
}

const MainPage: React.FC<MainPageProps> = ({ pause, restart }) => {
    return (
        <div>
            <nav>
                <button className='toolBtn' onClick={pause}>menu</button>
                <button className='toolBtn' onClick={restart}>restart</button>
            </nav>
        </div>
    )
}

export default MainPage