import { appState } from "../../context/context";
import { actionType } from "../actionType";

export const generateCandidates=({candidates,piece}:{candidates:[number,number][],piece:string})=>{
    return {
        type:actionType.Generate_Candidates,
        payload:{candidates,piece}
    }
}

export const clearCandidates=(piece:string)=>{
    return {
        type:actionType.Clear_Candidates,
        payload:piece
    }
}

export const promotionUpdate=(piece:string,x:number,y:number,file:number,rank:number)=>{
    return{
        type:actionType.Promotion_Update,
        payload:{piece,x,y,file,rank}
    }
}

export const promotionAction=(newPosition:string[][])=>{

    return {
        type:actionType.Promotion_Action,
        payload:newPosition
    }
}


export const castlingUpdate=(newCastle:string)=>{
    return {
        type:actionType.Can_Castle,
        payload:newCastle
    }
}

export const updateCheck=(checkedPlayer:string)=>{
    return{
        type:actionType.Update_Check,
        payload:checkedPlayer
    }
}

export const gameEnd=(gameStatus:string)=>{
    return {
        type:actionType.Game_End,
        payload:gameStatus
    }
}


export const newGame=(state:appState)=>{
    return{
    type:actionType.New_Game,
    payload:state
    }
}