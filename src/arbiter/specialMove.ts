import arbiter from "./arbiter";
import { MovesInterface } from "./getMoves"


export const enPassant = ({ currentPosition, prevPosition, piece, rank, file }: MovesInterface): [number, number][] => {
    const us = piece[0];

    
    const enemy = us === 'w' ? 'b' : 'w';
    const [start, dir] = us === 'w' ? [0, 1] : [7, -1];
    const candidatesMove: [number, number][] = []


    if(piece[1]!=='p'){
        return candidatesMove;
    }

    if (rank === start + 4 * dir) {
        if (prevPosition) {
            for (let i = -1; i <= 1; i += 2) {
                if (currentPosition[rank][file + i] === `${enemy}p` && currentPosition[rank+dir][file+i]==="") {
                    if (prevPosition[rank + 2][file + i] === `${enemy}p` && currentPosition[rank + 2][file + i] === "") {
                        candidatesMove.push([rank + 1, file + i]);
                        
                    }
                }
            }
        }
    }
    return candidatesMove;
}

export const castlingMove = ({ currentPosition, castling, piece, rank, file }: MovesInterface): [number, number][] => {
    const us = piece[0];
    const candidatesMove: [number, number][] = [];
    
    if(piece[1]!=='k'){
        return candidatesMove;
    }
    if(arbiter.isInCheck({position:currentPosition,prevPosition:currentPosition,player:us})){
        return candidatesMove;
    }
    
    if (castling) {
        
        const castle = us === 'w' ? castling.w : castling.b;
        
        if((rank%7!==0 || file!==4 || castle==="none")) {
            return candidatesMove;
        }

        if(castle==='left' || castle==='both'){
            if( currentPosition[rank] &&
                currentPosition[rank][file-1]==="" && 
                currentPosition[rank][file-2]==="" && 
                currentPosition[rank][file-3]==="" &&
                !arbiter.isInCheck({position:arbiter.performMove({position:currentPosition,piece,file,rank,x:file-1,y:rank}),prevPosition:currentPosition,player:us}) &&
                !arbiter.isInCheck({position:arbiter.performMove({position:currentPosition,piece,file,rank,x:file-2,y:rank}),prevPosition:currentPosition,player:us})
                ){
                if(true){
                    candidatesMove.push([rank,file-2]);
                }
            }
        }
        if(castle==='right' || castle==='both'){
            if( currentPosition[rank] && 
                currentPosition[rank][file+1]==='' && 
                currentPosition[rank][file+2]==='' &&
                !arbiter.isInCheck({position:arbiter.performMove({position:currentPosition,piece,file,rank,x:file+1,y:rank}),prevPosition:currentPosition,player:us}) &&
                !arbiter.isInCheck({position:arbiter.performMove({position:currentPosition,piece,file,rank,x:file+2,y:rank}),prevPosition:currentPosition,player:us})
                ){
                candidatesMove.push([rank,file+2]);
            }
        }
    }



    return candidatesMove;
}