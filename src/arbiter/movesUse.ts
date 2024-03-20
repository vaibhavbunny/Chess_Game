import copyPosition from "../helper"
import arbiter, {  allPlayerPieces } from "./arbiter"
import { enPassant } from "./specialMove"


export const movePiece = ({ position, piece, rank, file, y, x }: { position: string[][], piece: string, rank: number, file: number, y: number, x: number }): string[][] => {

    const newPosition = copyPosition(position)

    if (piece.endsWith('k') && Math.abs(x - file) > 1) { // Castles
        if (x === 2) { // Castles Long
            newPosition[rank][0] = ''
            newPosition[rank][3] = piece.startsWith('w') ? 'wr' : 'br'
        }
        if (x === 6) { // Castles Short
            newPosition[rank][7] = ''
            newPosition[rank][5] = piece.startsWith('w') ? 'wr' : 'br'
        }
    }
    newPosition[rank][file] = ''
    newPosition[y][x] = piece
    return newPosition
}

export const movePawn = ({ position, piece, rank, file, y, x }: { position: string[][], piece: string, rank: number, file: number, y: number, x: number }): string[][] => {
    const newPosition = copyPosition(position)

    // EnPassant, looks like capturing an empty cell
    // Detect and delete the pawn to be removed


    if (newPosition[y][x] === "" && y !== rank && x !== file) {
        newPosition[rank][x] = ''
    }
    newPosition[rank][file] = ''
    newPosition[y][x] = piece
    return newPosition
}


export const stalemateAndCheckMate = ({ position, prevPosition, player }: { position: string[][], prevPosition: string[][], player: string }) => {
    let candidate: [number, number][] = [];
    const pieces = allPlayerPieces({ player, position });
    const enemy=player==='w'?'b':'w';
    let ans="";

    pieces.forEach((playerPiece) => {
        let playerCandidates = [...(arbiter.getRegularMove({ currentPosition: position, piece: playerPiece.piece, rank: playerPiece.rank, file: playerPiece.file })), ...(enPassant({ currentPosition: position, prevPosition, piece: playerPiece.piece, rank: playerPiece.rank, file: playerPiece.file }))]

        candidate = [...candidate, ...playerCandidates.filter((move) => {
            const newPosition = arbiter.performMove({ position, piece: playerPiece.piece, rank: playerPiece.rank, file: playerPiece.file, x: move[1], y: move[0] });
            return !arbiter.isInCheck({ position: newPosition, player: playerPiece.piece[0], prevPosition: position });
        })]
    })
    if(candidate.length===0 ){
        if(!arbiter.isInCheck({position,player,prevPosition})){
        ans= "stalemate";
        }
        else{
            ans= `${enemy}checkMate`
        }
    }

    return ans;
}


export const insufficientMaterial=(position:string[][])=>{
    const whitePiece=allPlayerPieces({player:'w',position});
    const blackPiece=allPlayerPieces({player:'b',position});
    const allPiece=[...whitePiece,...blackPiece];
    if(allPiece.length===2){
        return true;
    }
    else if(allPiece.length===3){
        let ans=false;
        allPiece.forEach((item)=>{
            if(item.piece.endsWith('n') || item.piece.endsWith('b')){
                ans=true;
                return;
            }
        })
        return ans;    
    }
    else if(whitePiece.length===2 && blackPiece.length===2){
        let count=0;
        allPiece.forEach((item)=>{
            if(item.piece.endsWith('b')){
                if((item.rank+item.file)%2){
                    count++;
                }
                else{
                    count--;
                }
            }
        })
        if(count===2 || count===-2 ){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}