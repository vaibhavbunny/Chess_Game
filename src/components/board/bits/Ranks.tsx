import './Ranks.css'

const Ranks=(props:{ranks:number[]})=>{
return(
    <div className="ranks">
         {props.ranks.map(rank => <span key={rank}>{rank}</span>)}
    </div>
)
}
export default Ranks;
