import "./Board.css";
import { Tile } from "./Tile";
import { getCharacter } from "../../helper";
import Ranks from "./bits/Ranks";
import Files from "./bits/Files";
import Pieces from "../pieces/Pieces";
import { useAppContext } from "../../context/context";
import { Popup } from "../popup/Popup";
import { newGame } from "../../reducer/action/game";
import { initGameState } from "../../constant"

function Board() {
  const ranks: number[] = new Array(8).fill(0).map((rank, i) => 8 - i);
  const files: number[] = new Array(8).fill(0).map((file, i) => i + 1);
  const { appState ,dispatch} = useAppContext();
  const { candidates, check,turn } = appState;
  const currentPosition = appState.position[appState.position.length - 1];

  const newGamehandler=()=>{
    dispatch(newGame(initGameState))
  }

  // console.log(candidates);

  const getClassName = (i: number, j: number): string => {
    let classt = "";
    candidates.forEach((candi) => {
      if (i === candi[0] && j === candi[1]) {
        if (!currentPosition[i][j]) {
          classt = "candidate";
          return;
        } else {
          classt = "candidate attack";
          return;
        }
      }
    });
    return classt;
  };

  return (
    <div className="board-container">
      <div>
          <div className="turn-text">
            <p >{turn=='w'?"white to move":"black to move"}</p>
          </div>
          <div className="board">
          <Ranks ranks={ranks} />
          <div className="tiles">
            {ranks.map((rank, i) =>
              files.map((file, j) => (
                <Tile
                key={`${getCharacter(file)}${rank}`}
                className={getClassName(rank - 1, file - 1)}
                rank={rank}
                file={file}
                />
                ))
                )}
          </div>

          <Pieces />
          <Popup />

          <Files files={files}></Files>
        </div>
        <div className="footer"><button onClick={()=>{newGamehandler()}}>new Game</button></div>
      </div>
    </div>
  );
}

export default Board;
