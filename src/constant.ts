import { createPosition } from "./helper";

export const initGameState = {
    position : [createPosition()],
    turn : 'w' ,
    candidates:[],
    activePiece:'',
    castling:{w:'both',b:'both'},
    promotion:[-1,-1,-1,-1],
    check:"",
    gameEnd:""
}
