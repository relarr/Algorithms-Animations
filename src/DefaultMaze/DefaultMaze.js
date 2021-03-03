import { Fragment, useState } from 'react';

import dfs from '../algorithms/dfs';
import array from './array';
import Button from '../shared/UIComponents/Button';

import './DefaultMaze.css';

const DefaultMaze = () => {
    const [maze, setMaze] = useState(array);

    const animateDFSPath = async path => {
        for (const coordinate of path){
          await new Promise(promise => setTimeout(promise, 0.1));
          let cArray = [...maze];
          cArray[coordinate[0]][coordinate[1]] = 2;
          setMaze(cArray); 
        }
    };      

    const DFSHandler = async () => {
        let set = new Set();
        const path = [];
        dfs(maze, [0,1], [34,53], set,  path);
        await animateDFSPath(path);
    };

    return (
        <Fragment>
            <div className='title'>
                <h1>ALGORITHMS ANIMATIONS</h1>
            </div>
            <div className='default-maze'>
                {array.map((el, i) => {
                    return (
                        <div key={i}>
                            {el.map((el2, j) => 
                                <div key={j}
                                     className='compo'
                                     style={{ backgroundColor: el[j] === 1 ? 'rgb(24, 3, 66)' : 
                                                                el[j] === 2  && 'rgb(243, 243, 92)' }} ></div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className='solve'>
                <Button danger onClick={DFSHandler} >SOLVE</Button><p>THIS MAZE</p>
            </div>
        </Fragment>
    );
};

export default DefaultMaze;