import { useAppContext } from "../../context/context";
import copyPosition from "../../helper";
import { promotionAction, promotionUpdate } from "../../reducer/action/game";



export function Promotion({x,turn}:{x:number,turn:string}){
    const options=['q','r','b','n'];

    const color=turn[0];


    return(
        <div className={`promotion-container container${x}${color}`}> 

            {options.map((option)=>(<Option key={option} pieceType={option} className={`pieceprom ${color}${option}prom`}></Option>))}
        </div>
    )
}


function Option({pieceType,className}:{pieceType:string,className:string}){
    const {appState,dispatch}=useAppContext();
    const {turn,promotion,position}=appState;
    const currentPosition=position[position.length-1];
    const[x,y,file,rank]=promotion;
    console.log(x,y,rank,file);
    

    return <div className={className} onClick={(e)=>{
        const newPosition=copyPosition(currentPosition);
        newPosition[y][x]=`${turn}${pieceType}`
        newPosition[rank][file]="";
        dispatch(promotionAction(newPosition))
        dispatch(promotionUpdate(turn,-1,-1,-1,-1))
    }}></div>

}