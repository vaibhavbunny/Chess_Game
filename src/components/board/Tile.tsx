import { getCharacter } from "../../helper"

interface Props{
    rank:number,
    file:number,
    className:string
}

const generateClass=(rank:number,file:number)=>{
    const tileClass=(rank+file)%2?'tile-light':'tile-dark';
    return tileClass;
}


export function Tile(props:Props){
    return (
        <div className={`tile p-${getCharacter(props.file)}${props.rank} ${generateClass(props.rank,props.file)} ${props.className}`}>
            
        </div>
    )
}