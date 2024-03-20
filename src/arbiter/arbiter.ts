import { MovesInterface, getBisopMove, getKingMove, getKnightMove, getPawnMove, getQueenMove, getRookMove } from "./getMoves";
import { insufficientMaterial, movePawn, movePiece,stalemateAndCheckMate } from "./movesUse";
import { castlingMove, enPassant } from "./specialMove";
// import { movePawn, movePiece } from "./movesUse";

const arbiter = {
    getRegularMove: ({ currentPosition, piece, file, rank }: MovesInterface) => {
        const pieceType = piece[1]
        switch (pieceType) {
            case 'r': {
                return getRookMove({ currentPosition, piece, file, rank });
            }
            case 'b': {
                return getBisopMove({ currentPosition, piece, file, rank });
            }
            case 'n': {
                return getKnightMove({ currentPosition, piece, file, rank })
            }
            case 'q': {
                return getQueenMove({ currentPosition, piece, file, rank })
            }
            case 'k': {
                return [...getKingMove({ currentPosition, piece, file, rank })]
            }
            case 'p': {
                return [...getPawnMove({ currentPosition, piece, file, rank })]
            }
            default: {
                return [];
            }

        }
    },
    getMove: ({ currentPosition, prevPosition, castling, piece, file, rank }: MovesInterface) => {
        const pieceType = piece[1]
        switch (pieceType) {
            case 'r': {
                return getRookMove({ currentPosition, piece, file, rank });
            }
            case 'b': {
                return getBisopMove({ currentPosition, piece, file, rank });
            }
            case 'n': {
                return getKnightMove({ currentPosition, piece, file, rank })
            }
            case 'q': {
                return getQueenMove({ currentPosition, piece, file, rank })
            }
            case 'k': {
                return [...getKingMove({ currentPosition, piece, file, rank }), ...castlingMove({ currentPosition, castling, piece, file, rank })]
            }
            case 'p': {
                return [...getPawnMove({ currentPosition, piece, file, rank }), ...enPassant({ currentPosition, prevPosition, piece, file, rank })]
            }
            default: {
                return [];
            }

        }
    },
    getValidMoves: ({ currentPosition, prevPosition, castling, piece, file, rank }: MovesInterface) => {
        let moves = arbiter.getMove({ currentPosition, prevPosition, castling, piece, file, rank });

        moves = moves.filter((move) => {
            
            const position = arbiter.performMove({ position: currentPosition, piece, file, rank, x: move[1], y: move[0] });
            const ans=!arbiter.isInCheck({ position, player: piece[0], prevPosition: currentPosition });
            return ans;
            
        })
        // console.log(moves);

        return moves;
    }
    ,
    performMove: function ({ position, piece, file, rank, x, y }: { position: string[][], piece: string, rank: number, file: number, x: number, y: number }) {
        if (piece.endsWith('p')) {
            return movePawn({ position, piece, file, rank, x, y });
        }
        else {
            return movePiece({ position, piece, file, rank, x, y })
        }
    },


    isInCheck: ({ position, player, prevPosition }: { position: string[][], prevPosition: string[][], player: string }) => {

        const enemy = (player === 'w') ? 'b' : 'w';
        const kingPos = kingPosition({ position, player });
        const playerCandidates = allPlayerCandidates({ player: enemy, position, prevPosition });
        let checked = false;
        playerCandidates.forEach((candidate) => {
            if (candidate[0] === kingPos[0] && candidate[1] === kingPos[1]) {
                checked = true;
            }
        })
        return checked;
    },

    gameEnd:({position,prevPosition,turn}:{position:string[][],prevPosition:string[][],turn:string})=>{
        const stAndCm=stalemateAndCheckMate({position,prevPosition,player:turn});
        
        
        if(stAndCm){
            if(stAndCm==='stalemate'){
                return "draw by stalemate"
            }
            else{
                return `${stAndCm[0]} wins`
            }
        }
        if(insufficientMaterial(position)){
            return "draw by insufficientMaterial"
        }
        else{
            return "";
        }
    }


}

export default arbiter;


export const allPlayerCandidates = ({ player, position, prevPosition }: { player: string, position: string[][], prevPosition: string[][] }) => {
    const playerPieces = allPlayerPieces({ player, position });

    let playerCandidates: [number, number][] = [];
    playerPieces.forEach((playerPiece) => {
        playerCandidates = [...playerCandidates, ...(arbiter.getRegularMove({ currentPosition: position, piece: playerPiece.piece, rank: playerPiece.rank, file: playerPiece.file })), ...(enPassant({ currentPosition: position, prevPosition, piece: playerPiece.piece, rank: playerPiece.rank, file: playerPiece.file }))]
    })
    return playerCandidates;
}


export const allPlayerPieces = ({ player, position }: { player: string, position: string[][] }) => {
    const playerPiece: { piece: string, rank: number, file: number }[] = [];
    position.forEach((rank, i) => {
        rank.forEach((piece, j) => {
            if (piece.startsWith(player)) {
                playerPiece.push({ piece, rank: i, file: j });
            }
        })
    })
    return playerPiece;
}

export const kingPosition = ({ player, position }: { player: string, position: string[][] }) => {
    const kingPos: [number, number] = [-1, -1];
    position.forEach((rank, i) => {
        rank.forEach((piece, j) => {
            if (piece.endsWith('k') && piece.startsWith(player)) {
                kingPos[0] = i;
                kingPos[1] = j;
                return;
            }
        })
    })
    return kingPos;
}




