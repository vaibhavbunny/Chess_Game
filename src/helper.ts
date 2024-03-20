export const getCharacter=(file:number):string=>{
    return String.fromCharCode(96+file);
}

export const createPosition=():string[][]=>{
    const position:string[][]=new Array(8).fill('').map(x=>new Array(8).fill(''));

    for(let i=0;i<8;i++){
        position[6][i]='bp';
        position[1][i]='wp';
    }
    position[0][0]='wr'
    position[0][7]='wr'
    position[0][1]='wn'
    position[0][6]='wn'
    position[0][2]='wb'
    position[0][5]='wb'
    position[0][3]='wq'
    position[0][4]='wk'
    
    
    position[7][0]='br'
    position[7][7]='br'
    position[7][1]='bn'
    position[7][6]='bn'
    position[7][2]='bb'
    position[7][5]='bb'
    position[7][3]='bq'
    position[7][4]='bk'


    return position;
    

}

export default function copyPosition(position:string[][]){
    const newPosition=new Array(8).fill('').map(i=>new Array(8).fill(''));
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            newPosition[i][j]=position[i][j];
        }
    }
    return newPosition;
}
