import { initGameState } from "../../constant"
import { useAppContext } from "../../context/context"
import { newGame } from "../../reducer/action/game";

export const GameEnd = ({ gameEnd }: { gameEnd: string }) => {
    const {dispatch}=useAppContext();
    const newGamehandler=()=>{
        dispatch(newGame(initGameState))
    }


    if (gameEnd.startsWith('draw')) {
        return (
            <div className="gameend-container">

            <div className="gameend-box">
                <div className="draw-image">
                    <div className="win-imagew image"></div>
                    <div className="win-imageb image"></div>
                </div>
                <h3>{gameEnd}</h3>
                <button onClick={()=>{newGamehandler()}}>new Game</button>
            </div>
            </div>
        )
    }
    return (
        <div className="gameend-container">

            <div className="gameend-box">
                <div className="image-container"><div className={`win-image${gameEnd[0]} image`}></div></div>
                <h3>wins</h3>
                <button onClick={()=>{newGamehandler()}}>new Game</button>
            </div>
            </div>
    )
}