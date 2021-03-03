import { Fragment, useState, useRef } from 'react';

import Button from '../shared/UIComponents/Button';

import dfs from '../algorithms/dfs';
import bfs from '../algorithms/bfs';

import './Maze.css';

const Maze = () => {
  const colSizeRef = useRef();
  const rowSizeRef = useRef(); 
  
  let arr = new Array(18).fill(0).map(() => new Array(44).fill(0));
  const [array, setArray] = useState(arr);
  const [startEnd, setStartEnd] = useState({ start: [0, 0], end: [array.length-1, array[0].length-1] });
  const [startEndDefault, setStartEndDefault] = useState(true);
  const [disableControllers, setDisableControllers] = useState(false);
  const speedRef = useRef();
  const [speed, setSpeed] = useState(150);

  const sizeHandler = () => {
    const cArr = [];
    for (let i = 0; i < rowSizeRef.current.value; ++i) {
      const inner = [];
      for (let j = 0; j < colSizeRef.current.value; ++j){
        inner.push(0);
      }
      cArr.push(inner);
    }
    setArray(cArr);
    const sE = { start: [0, 0], end: [cArr.length-1, cArr[0].length-1] };
    setStartEnd(sE);
  };

  const addBlockHandler = (row, col) => {
    if (startEndDefault){
      if ([row, col].toString() === startEnd.start.toString() || [row, col].toString() === startEnd.end.toString()) {}
      else {
        let cArray = [...array];
        cArray[row][col] = cArray[row][col] === 0 ? 1 : 0;
        setArray(cArray);
      }
    } else {
      if (startEnd.start.toString() === [-1, -1].toString() && startEnd.end.toString() === [-1, -1].toString()){
        setStartEnd(prev => ({ ...prev, start: [row, col]}));
      } else if (startEnd.start.toString() !== [-1, -1].toString() && startEnd.end.toString() === [-1, -1].toString()){
        setStartEnd(prev => ({ ...prev, end: [row, col] }));
        setStartEndDefault(true)
      }
    }
  };

  const startEndHandler = () => {
    if (startEndDefault){
      setStartEndDefault(false);
      const sE = {start: [-1, -1], end: [-1, -1] };
      setStartEnd(sE);
    } else {
      setStartEndDefault(true);
      const sE = { start: [0, 0], end: [array.length-1, array[0].length-1] };
      setStartEnd(sE);
    }
  };


  const animateDFSPath = async path => {
    for (const coordinate of path){
      await new Promise(promise => setTimeout(promise, speed));
      let cArray = [...array];
      cArray[coordinate[0]][coordinate[1]] = 2;
      setArray(cArray);
    }
  };

  const animateFinalPath = async (path, color) => { 
    for (const coordinate of path){
        await new Promise(promise => setTimeout(promise, 15));
        let cArray = [...array];
        cArray[coordinate[0]][coordinate[1]] = color;
        setArray(cArray);
      }
  };
  
  const DFSHandler = async () => {
    setDisableControllers(true);
    let set = new Set();
    const path = [];
    const foundExit = dfs(array, startEnd.start, startEnd.end, set,  path);
    await animateDFSPath(path);
    if (foundExit) await animateFinalPath(path, 3);
    else await animateFinalPath(path, 4);
    setDisableControllers(false);
  };

  const BFSHandler = async () => {
    setDisableControllers(true);
    let visited = new Set();
    const path = [];
    await bfs(array, setArray, startEnd.start, startEnd.end, visited, path, speed);
    if (startEnd.end.toString() === path[path.length-1].toString()) await animateFinalPath(path, 3);
    else await animateFinalPath(path, 4);
    setDisableControllers(false);
  };

  return (
    <Fragment>
        <div className='controllers'>
            <Button disabled={disableControllers} onClick={DFSHandler}>DFS</Button>
            <Button disabled={disableControllers} onClick={BFSHandler}>BFS</Button>
            <label htmlFor='rows'>ROWS</label>
            <input id='rows' ref={rowSizeRef} disabled={disableControllers} type="number" placeholder='18' value={rowSizeRef.current ? rowSizeRef.current.value : '18'} min="3" max="18" onChange={sizeHandler}/>
            <label htmlFor='columns'>COLUMNS</label>
            <input id='columns' ref={colSizeRef} disabled={disableControllers} type="number" placeholder='44' value={colSizeRef.current ? colSizeRef.current.value : '44'} min="3" max="44" onChange={sizeHandler}/>
            <Button reversed disabled={disableControllers} onClick={startEndHandler}>{startEndDefault ? 'SELECT START & END' : 'DEFAULT START & END'}</Button>
            <label htmlFor='speed'>SPEED</label>
            <input id='speed' ref={speedRef} disabled={disableControllers} type="number" placeholder='150' value={speedRef.current ? speedRef.current.value : '150'} min='10' max='1000' step='10' onChange={() => setSpeed(speedRef.current.value)}/>
            <Button reversed disabled={disableControllers} onClick={sizeHandler}>CLEAR MAZE</Button>
        </div>
        <div className='maze'>
            {array.map((el, i) => {
                return (
                <div key={i}>
                    {el.map((el2, j) => 
                    <div 
                        key={j} 
                        className='component'
                        onClick={() => addBlockHandler(i, j)}
                        style={{ backgroundColor: el[j] === 1 ? 'rgb(15, 73, 100)' : 
                                                  el[j] === 2  ? 'rgb(115, 201, 93)' : 
                                                  el[j] === 3 ? 'rgb(225, 228, 92)' : 
                                                  el[j] === 4 && 'rgb(180, 85, 101)'}} >
                      {[i, j].toString() === startEnd.start.toString() ? 'S' : [i, j].toString() === startEnd.end.toString() && 'E'}
                    </div>
                    )}
                </div>
                );
            })}
        </div>
    </Fragment>
  );
}

export default Maze;