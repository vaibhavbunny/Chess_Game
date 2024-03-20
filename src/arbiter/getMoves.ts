
export interface MovesInterface {
    currentPosition: string[][],
    prevPosition?:string[][],
    castling?:{w:string,b:string},
    piece: string,
    file: number,
    rank: number
}

export const getRookMove = ({ currentPosition, piece, file, rank }: MovesInterface) => {
    const us = piece[0];

    const enemy = us === 'w' ? 'b' : 'w';
    const direction = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const candidatesMove: [number, number][] = [];
    direction.forEach((dir) => {
        for (let ii = 1; ii < 8; ii++) {

            if (!(currentPosition[rank + ii * dir[0]])) {
                break;
            }
            if (currentPosition[rank + ii * dir[0]][file + ii * dir[1]] === undefined) {
                break;
            }
            if ((currentPosition[rank + ii * dir[0]][file + ii * dir[1]]) === "") {
                candidatesMove.push([rank + ii * dir[0], file + ii * dir[1]]);
            }
            else if (currentPosition[rank + ii * dir[0]][file + ii * dir[1]].startsWith(enemy)) {
                candidatesMove.push([rank + ii * dir[0], file + ii * dir[1]]);
                break;
            }
            else {
                break;
            }
        }
    })
    return candidatesMove;

}


export const getBisopMove = ({ currentPosition, piece, file, rank }: MovesInterface) => {
    const us = piece[0];

    const enemy = us === 'w' ? 'b' : 'w';
    const direction = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
    const candidatesMove: [number, number][] = [];
    direction.forEach((dir) => {

        for (let ii = 1; ii < 8; ii++) {

            if (!(currentPosition[rank + ii * dir[0]])) {
                return;
            }
            if (currentPosition[rank + ii * dir[0]][file + ii * dir[1]] === undefined) {
                return;
            }
            if ((currentPosition[rank + ii * dir[0]][file + ii * dir[1]]) === "") {
                candidatesMove.push([rank + ii * dir[0], file + ii * dir[1]]);
            }
            else if (currentPosition[rank + ii * dir[0]][file + ii * dir[1]].startsWith(enemy)) {
                candidatesMove.push([rank + ii * dir[0], file + ii * dir[1]]);
                return;
            }
            else {
                return;
            }
        }
    })
    return candidatesMove;

}

export const getKnightMove = ({ currentPosition, piece, file, rank }: MovesInterface) => {
    const us = piece[0];

    // const enemy=us==='w'?'b':'w';
    const direction = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]];
    const candidatesMove: [number, number][] = [];
    direction.forEach((dir) => {
        if (!(currentPosition[rank + dir[1]])) {

        }
        else if (currentPosition[rank + dir[1]][file + dir[0]] === undefined) {
        }
        else if (!(currentPosition[rank + dir[1]][file + dir[0]]).startsWith(us)) {
            candidatesMove.push([rank + dir[1], file + dir[0]]);
        }
    })
    return candidatesMove;

}

export const getQueenMove = ({ currentPosition, piece, file, rank }: MovesInterface) => {
    return [
        ...getRookMove({ currentPosition, piece, file, rank }),
        ...getBisopMove({ currentPosition, piece, file, rank })
    ]
}

export const getKingMove = ({ currentPosition,castling, piece, file, rank }: MovesInterface) => {
    const us = piece[0];
    const direction: [number, number][] = [
        [1, -1], [1, 0], [1, 1],
        [0, -1], [0, 1],
        [-1, -1], [-1, 0], [-1, 1]
    ];
    let candidatesMove: [number, number][] = [];
    direction.forEach((dir) => {
        if (currentPosition[rank + dir[0]] && (currentPosition[rank + dir[0]][file + dir[1]] || currentPosition[rank+dir[0]][file+dir[1]]==="") && !currentPosition[rank + dir[0]][file + dir[1]].startsWith(us)) {
            candidatesMove.push([rank + dir[0], file + dir[1]]);
        }
    })
    

    return candidatesMove;
}

export const getPawnMove = ({ currentPosition,prevPosition, piece, file, rank }: MovesInterface) => {
    const us = piece[0];
    const enemy=us==='w'?'b':'w';
    const [dir, start] = (us === 'w') ? [1, 0] : [-1, 7];
    let candidatesMove: [number, number][] = [];

    if(currentPosition[rank+1*dir]){
        if( currentPosition[rank + dir][file] === ""){
            candidatesMove.push([rank+dir,file]);
        }
        if( currentPosition[rank + dir][file+dir]?.startsWith(enemy) ){
            candidatesMove.push([rank+dir,file+dir])
        }
        if( currentPosition[rank + dir][file-dir]?.startsWith(enemy) ){
            candidatesMove.push([rank+dir,file-dir])
        }
    }

    if (rank === start + dir) {
        if (currentPosition[rank + 2 * dir] && currentPosition[rank + 2 * dir][file] === "") {
            candidatesMove.push([rank + 2 * dir, file]);
        }
    }
    // candidatesMove=candidatesMove.concat(enPassant({currentPosition,prevPosition,piece,rank,file}))
    return candidatesMove;

}





