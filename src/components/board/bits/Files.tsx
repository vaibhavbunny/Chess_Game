import { getCharacter } from "../../../helper"
import './Files.css';

const Files=(props:{files:number[]})=>{
    return(
        <div className="files">
            {props.files.map(file=><span key={file}>{getCharacter(file)}</span>)}
        </div>
    )
}

export default Files;