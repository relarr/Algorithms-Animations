import { Fragment, useState, useRef } from 'react';

import Button from '../shared/UIComponents/Button';
import selectionSort from '../algorithms/selectionSort';
import insertionSort from '../algorithms/insertionSort';
import bubbleSort from '../algorithms/bubbleSort';
import quickSort from '../algorithms/quickSort';
import mergeSort from '../algorithms/mergeSort';

import './Sorting.css';

const rand = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min)+min);
};

const generateArray = size => {
    const a = [];
    for (let i = 0; i < size; ++i){
        a.push(rand(1, 35));
    }
    return a;
};

const Sorting = () => {
    const arr = generateArray(72);
    const [array, setArray] = useState(arr);
    const [sorted, setSorted] = useState();
    const [sorted2, setSorted2] = useState([]);
    const [sorting, setSorting] = useState();
    const [pivot, setPivot] = useState();
    const [swapping, setSwapping] = useState();

    const [algorithm, setAlgorithm] = useState();

    const speedRef = useRef();
    const [speed, setSpeed] = useState(50);

    const [disable, setDisable] = useState(false);

    const generateNewArray = () => {
        const newArray = generateArray(72);
        setArray(newArray);
    };

    const speedHandler = () => {
        setSpeed(speedRef.current.value)
    };

    const selectionSortHandler = async () => {
        setAlgorithm('SELECTION');
        setDisable(true);
        await selectionSort(array, setArray, setPivot, setSorting, setSorted, speed);
        setDisable(false);
    };

    const insertionSortHandler = async () => {
        setAlgorithm('INSERTION');
        setDisable(true);
        await insertionSort(array, setArray, setSorting, setSorted, speed);
        setDisable(false);
    };

    const bubbleSortHandler = async () => {
        setAlgorithm('BUBBLE');
        setDisable(true);
        await bubbleSort(array, setArray, setSorting, setSorted, speed);
        setDisable(false);
    };

    const quickSortHandler = async () => {
        setAlgorithm('QUICK');
        setDisable(true);
        await quickSort(array, 0, array.length-1, setArray, setPivot, setSwapping, setSorted2, speed);
        setDisable(false);
    };

    const mergeSortHandler = async () => {
        setAlgorithm('MERGE');
        setDisable(true);
        await mergeSort(array, 0, array.length-1, setArray, setSorting, setSorted, speed);
        setDisable(false);
    };

    return (
        <Fragment>
            <div className='controllers'>
                <Button disabled={disable} onClick={selectionSortHandler}>SELECTION SORT</Button>
                <Button disabled={disable} onClick={insertionSortHandler}>INSERTION SORT</Button>
                <Button disabled={disable} onClick={bubbleSortHandler}>BUBBLE SORT</Button>
                <Button disabled={disable} onClick={quickSortHandler}>QUICK SORT</Button>
                <Button disabled={disable} onClick={mergeSortHandler}>MERGE SORT</Button>
                <label htmlFor='speed'>SPEED</label>
                <input id='speed' ref={speedRef} disabled={disable} type="number" placeholder='50' value={speedRef.current ? speedRef.current.value : '50'} min='10' max='1000' step='10' onChange={speedHandler}/>
                <Button disabled={disable} reversed onClick={generateNewArray}>GET NEW ARRAY</Button> 
            </div>
            <div className='sorting'>
            {array.map((el, i) => {
                return <div
                    key={i}
                    className='bar'
                    style={{
                        height: el*20+'px',
                        backgroundColor: algorithm === 'SELECTION' ? (i <= sorted ? 'rgb(225, 228, 92)' : i === sorting ? 'rgb(115, 201, 93)' : i === pivot && 'rgb(15, 73, 100)') :
                                         algorithm === 'INSERTION' ? (i === sorting ? 'rgb(115, 201, 93)' : i <= sorted && 'rgb(225, 228, 92)') :
                                         algorithm === 'BUBBLE' ? (i >= sorted ? 'rgb(225, 228, 92)' : i === sorting && 'rgb(115, 201, 93)') :
                                         algorithm === 'QUICK' ? (pivot && i === pivot ? 'rgb(15, 73, 100)' : 
                                                                   swapping && (i === swapping[0] ? 'rgb(115, 201, 93)' : i === swapping[1] ? 'rgb(115, 201, 93)' :
                                                                   sorted2.includes(i) && 'rgb(225, 228, 92)')) :
                                         algorithm === 'MERGE' && (i === sorting ? 'rgb(115, 201, 93)' : i <= sorted && 'rgb(225, 228, 92)')
                    }} >
                </div>
            })}
            </div>
        </Fragment>
    );
};

export default Sorting;