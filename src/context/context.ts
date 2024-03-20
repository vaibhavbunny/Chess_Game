import { Dispatch, createContext,useContext } from "react";
import { initGameState } from "../constant";
import { ActionInterface } from "../reducer/reducer";

export interface appState{
    position:string[][][];
    turn:string,
    candidates:[number,number][],
    activePiece:string,
    castling:{w:string,b:string},
    promotion:number[],
    check:string,
    gameEnd:string
}
interface ContextType{
    appState:appState,
    dispatch: Dispatch<ActionInterface>
}
export const AppContext=createContext<ContextType>({
    appState:initGameState,
    dispatch:(ActionType)=>undefined
});

export const useAppContext=()=>(useContext(AppContext))