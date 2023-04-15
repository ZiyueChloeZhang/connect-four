import { Dialog } from '@headlessui/react'
import { useGameDispatch, useGameState } from "../shared/GameContext";
import { FC } from "react";

const PauseDialog: FC<{ restart: () => void }> = ({restart}) => {
    const {status} = useGameState();
    const dispatch = useGameDispatch();

    function continueGame() {
        dispatch({type: "CONTINUE"});
    }

    function quitGame() {
        dispatch({type: "QUIT"});
    }

    return (
        <Dialog open={status === "PAUSED"} onClose={continueGame}>
            <Dialog.Panel className='menu-container' id='pause-dialog'>
                <h1>PAUSE</h1>
                <div>
                    <button onClick={continueGame}>continue game</button>
                    <button onClick={restart}>restart</button>
                    <button className="pinkBtn" onClick={quitGame}>quit game</button>
                </div>
            </Dialog.Panel>
        </Dialog>
    )
}

export default PauseDialog