import PropTypes from 'prop-types'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import checkIcon from '../../assets/icon-check.svg';

type PauseDialogProps = {
    isOpen: boolean,
    continueGame: () => void,
    restart: () => void,
    quit: () => void
}

const PauseDialog: React.FC<PauseDialogProps> = ({ isOpen, continueGame, restart, quit }) => {
    return (
        <Dialog open={isOpen} onClose={continueGame}>
            <Dialog.Panel className='menu-container' id='pause-dialog'>
                <h1>PAUSE</h1>
                <div>
                    <button onClick={continueGame}>continue game</button>
                    <button onClick={restart}>restart</button>
                    <button className="pinkBtn" onClick={quit}>quit game</button>
                </div>
            </Dialog.Panel >
        </Dialog >
    )
}

export default PauseDialog