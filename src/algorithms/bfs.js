
const bfs = async (array, setArray, start, end, visited, path, speed) => {
    const queue = [];
    queue.push(start);
    path.push(start);
    while (queue.length !== 0){
        const curr = queue.shift();
        await new Promise(promise => setTimeout(promise, speed));
        let cArray = [...array];
        cArray[curr[0]][curr[1]] = 2;
        setArray(cArray);

        path.push([curr[0], curr[1]]);

        if (curr.toString() === end.toString()) break;        

        if (curr[1]+1 < array[curr[0]].length && array[curr[0]][curr[1]+1] === 0 && !visited.has([curr[0], curr[1]+1].toString())){
            queue.push([curr[0], curr[1]+1]); 
            visited.add([curr[0], curr[1]+1].toString());
        }
        if (curr[0]+1 < array.length && array[curr[0]+1][curr[1]] === 0 && !visited.has([curr[0]+1, curr[1]].toString())){
            queue.push([curr[0]+1, curr[1]]); 
            visited.add([curr[0]+1, curr[1]].toString());
        }
        if (curr[1]-1 >= 0 && array[curr[0]][curr[1]-1] === 0 && !visited.has([curr[0], curr[1]-1].toString())){
            queue.push([curr[0], curr[1]-1]);
            visited.add([curr[0], curr[1]-1].toString());
        }
        if (curr[0]-1 >= 0 && array[curr[0]-1][curr[1]] === 0 && !visited.has([curr[0]-1, curr[1]].toString())){
            queue.push([curr[0]-1, curr[1]]);
            visited.add([curr[0]-1, curr[1]].toString());
        }
    }
};

export default bfs;