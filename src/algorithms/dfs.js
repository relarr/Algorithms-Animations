
const deadEnd = (row, col, array, visited) => {
    if ((row+1 >= array.length || visited.has([row+1, col].toString()) || array[row+1][col] === 1) &&
        (col+1 >= array[row].length || visited.has([row, col+1].toString()) || array[row][col+1] === 1) &&
        (row-1 < 0 || visited.has([row-1, col].toString()) || array[row-1][col] === 1) &&
        (col-1 < 0 || visited.has([row, col-1].toString()) || array[row][col-1] === 1)) return true;

    return false;
};

const dfs = (array, start, end, visited, path) => {
    if (start[0] < 0 || start[0] >= array.length || start[1] < 0 || start[1] >= array[start[0]].length) return false;

    if (visited.has([start[0], start[1]].toString())) return false;

    if (array[start[0]][start[1]] === 1) return false;

    visited.add([start[0], start[1]].toString());
    path.push([start[0], start[1]]);

    const atEnd = (start[0] === end[0]) && (start[1] === end[1]);

    if (deadEnd(start[0], start[1], array, visited) && !atEnd) return false;

    if (atEnd || dfs(array, [start[0], start[1]+1], end, visited, path) || dfs(array, [start[0]+1, start[1]], end, visited, path) ||
        dfs(array, [start[0], start[1]-1], end, visited, path) || dfs(array, [start[0]-1, start[1]], end, visited, path)) return true;

    return false;
};

export default dfs;