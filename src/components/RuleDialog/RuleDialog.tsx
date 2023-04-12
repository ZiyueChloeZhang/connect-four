import PropTypes from 'prop-types'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import checkIcon from '../../assets/icon-check.svg';

type RuleDialogProps = {
    isOpen: boolean,
    closeDialog: () => void
}

const RuleDialog: React.FC<RuleDialogProps> = ({ isOpen, closeDialog }) => {
    return (
        <Dialog open={isOpen} onClose={closeDialog}>
            <div className='menu-container' id='rule-dialog'>
                <Dialog.Panel>
                    <div>
                        <h1>RULES</h1>
                        <section>
                            <h2>OBJECTIVES</h2>
                            <p>Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally).</p>
                        </section>
                        <section>
                            <h2>HOW TO PLAY</h2>
                            <ol>
                                <li>Players must alternate turns, and only one disc can be dropped in each turn. </li>
                                <li>Red goes first in the first game.</li>
                                <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
                                <li>The starter of the previous game goes second on the next game.</li>
                            </ol>
                        </section>
                    </div>
                    <button className='pinkBtn' onClick={closeDialog}>
                        <img src={checkIcon} alt="check icon" />
                    </button>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default RuleDialog