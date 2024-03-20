import { actionType } from "../actionType"

export const makeNewMove=(newPosition:string[][])=>{

    return {
        type:actionType.NEW_MOVE,
        payload:newPosition
    }
}