import { useAppContext } from "../../context/context";
import { GameEnd } from "./GameEnd";
import { Promotion } from "./Promotion";
import './popup.css'

export function Popup() {

    const { appState } = useAppContext();
    if (appState.promotion[0]>=0) {
        return (
            <div className="popUp">
                <Promotion turn={appState.turn} x={appState.promotion[0]} />
            </div>
        )
    }

    if(appState.gameEnd){
        return (
            <div className="popUp">
                <GameEnd gameEnd={appState.gameEnd}></GameEnd>
            </div>
        )
    }
    return(
        <></>
    )

}

