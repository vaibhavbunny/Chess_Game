
import arbiter, { kingPosition } from "../../arbiter/arbiter";
import { useAppContext } from "../../context/context";
import copyPosition from "../../helper";
import { castlingUpdate, clearCandidates, gameEnd, promotionUpdate, updateCheck } from "../../reducer/action/game";
import { makeNewMove } from "../../reducer/action/move";
import Piece from "./Piece";
import './Pieces.css';
import { useRef } from "react";


const Pieces = () => {
    const { appState, dispatch } = useAppContext();
    const ref = useRef<HTMLDivElement>(null);

    const currentPosition: string[][] = appState.position[appState.position.length - 1];
    const prevPosition: string[][] = appState.position[appState.position.length - 2];
    const candidates = appState.candidates;
    const castling=appState.castling;

    const calculateCordinate = (e: React.DragEvent): number[] => {
        const element = ref.current;
        const cords: { top: number, left: number, width: number } | undefined = element?.getBoundingClientRect();
        
        if (cords) {
            const size=cords.width /8;
            const x = Math.floor((e.clientX - cords.left) / size);
            const y = Math.floor(8 - (e.clientY - cords.top) / size);
            return [x, y];
        }
        return []
    }


    const updateGameEnd=(position:string[][],prevPosition:string[][],player:string)=>{
        const enemy=player==='w'?'b':'w';
        const ans=arbiter.gameEnd({position,prevPosition,turn:enemy});
        
        if(ans){
            dispatch(gameEnd(ans));
        }
    }


    const updateForCheck=(player:string,position:string[][])=>{
        const enemy=player==='w'?'b':'w';
        
        // console.log(arbiter.isInCheck({position,player:enemy,prevPosition}),enemy);

        if(arbiter.isInCheck({position,player:enemy,prevPosition})){
            const kingPos=kingPosition({player:enemy,position});
            const ans=`${enemy}${kingPos[0]}${kingPos[1]}`
            dispatch(updateCheck(ans));
        }
        else{
            dispatch(updateCheck(""))
        }
    }

    const isValidMove = (x: number, y: number) => {
        let ans = false;
        candidates.forEach((candi) => {
            if (x === candi[1] && y === candi[0]) {
                ans = true;
                return;
            }
        })
        return ans;
    }
    const makeNewPosition = (rank: string, file: string, x: number, y: number, piece: string): string[][] => {
        const rankNum = Number(rank);
        const fileNum = Number(file);
        if (piece[1] === 'p' && y !== rankNum && x !== fileNum && currentPosition[y][x]==="") {
            const newPosition = copyPosition(currentPosition);
            newPosition[rankNum][fileNum] = '';
            newPosition[rankNum][x]='';
            newPosition[y][x] = piece;
            return newPosition;
        }
        
        else if(piece[1]==='k' && Math.abs(fileNum-x)>1){
            
            const [change,shift]=(x-fileNum>0)?[7,-1]:[0,1];
            const newPosition = copyPosition(currentPosition);
            newPosition[rankNum][fileNum] = '';
            newPosition[y][x+shift]=newPosition[y][change];
            newPosition[y][change]='';
            newPosition[y][x] = piece;
            dispatch(castlingUpdate('none'));
            return newPosition;
        }

        else {
            const player:'w'|'b'=piece[0]==='w'?'w':'b';
            if(piece[1]==='k' || piece[1]==='r'){
                if(fileNum===0){
                    if(castling[player]==='both'){
                        dispatch(castlingUpdate('right'));
                    }
                    else if(castling[player]==='left'){
                        dispatch(castlingUpdate('none'));
                    }
                }
                if(fileNum===7){
                    if(castling[player]==='both'){
                        dispatch(castlingUpdate('left'));
                    }
                    else if(castling[player]==='right'){
                        dispatch(castlingUpdate('none'));
                    }
                }

            }
      
            const newPosition = copyPosition(currentPosition);
            newPosition[rankNum][fileNum] = '';
            newPosition[y][x] = piece;
            return newPosition;
        }
    }
    const move = (e: React.DragEvent) => {
        const [piece, rank, file] = e.dataTransfer.getData('text').split(',');
        const [x, y] = calculateCordinate(e);
        if (isValidMove(x, y)) {
                  
            if(piece[1]==='p' && (y===0 || y===7)){
                dispatch(promotionUpdate(piece,x,y,Number(file),Number(rank)))
                return;
            }
            const newPosition = makeNewPosition(rank, file, x, y, piece)
            const actionForNewMove = makeNewMove(newPosition)
            dispatch(actionForNewMove);
            updateForCheck(piece[0],newPosition);
            updateGameEnd(newPosition,prevPosition,piece[0]);
        }
        dispatch(clearCandidates(piece));
    }

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        move(e);
    }

    const onDragOver = (e: React.DragEvent) => { e.preventDefault() }

    return <div
        className="pieces"
        onDrop={onDrop}
        onDragOver={onDragOver}
        ref={ref}
    >
        {currentPosition.map((rank, i) => (
            rank.map((p, j) => (
                (p === '') ? null :
                    <Piece key={`${i}${j}`} rank={i} piece={currentPosition[i][j]} file={j} />
            ))
        ))}
    </div>
}

export default Pieces;