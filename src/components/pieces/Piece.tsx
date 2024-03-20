import  arbiter  from '../../arbiter/arbiter';
import { useAppContext } from '../../context/context';
import { clearCandidates, generateCandidates } from '../../reducer/action/game';
import './Pieces.css';


const Piece = (props: { rank: number, file: number, piece: string }) => {
    const piece = props.piece;
    const file = props.file;
    const rank = props.rank;
    const { appState, dispatch } = useAppContext();
    const { position, turn,castling } = appState;
    const currentPosition = position[position.length - 1];
    const prevPosition = position[position.length - 2];
    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', `${piece},${rank},${file}`);
        const element = e.target as HTMLElement;
        setTimeout(() => { element.style.display = 'none'; }, 0);


        if (piece[0] === turn) {
            const candidates = arbiter.getValidMoves({ currentPosition, prevPosition,castling, piece: piece, file, rank });
            dispatch(generateCandidates({candidates, piece }))
        }
    }

    const onDragEnd = (e: React.DragEvent) => {
        const element = e.target as HTMLDivElement;
        element.style.display = 'block';
        dispatch(clearCandidates(piece));
    }


    return <div
        className={`piece ${piece} p-${rank}${file}`}
        draggable={true}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
    ></div>
}

export default Piece;