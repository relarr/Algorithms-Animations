import swap from './swap';

const quickSort = async (array, start, end, setArray, setPivot, setSwapping, setSorted2, speed) => {
    if (end < start ) return;

    let pivot = end;
    let curr = start;
    while (pivot >= start && curr < end && pivot !== curr){
        setPivot(pivot);
        if (array[curr] > array[pivot]){
            setPivot(pivot);

            if (pivot-1 === start || pivot-1 === curr){
                setSwapping([pivot, curr]);
                await new Promise(promise => setTimeout(promise, speed));
                let cArray = [...array];
                swap(cArray, pivot, curr);
                array[pivot] = cArray[pivot];
                array[curr] = cArray[curr];
                setSwapping([curr, pivot]);
                await new Promise(promise => setTimeout(promise, speed));
                setArray(cArray);
                await new Promise(promise => setTimeout(promise, speed));
                setSwapping(null)
                setPivot(curr);
            } else {
                setPivot(null)
                setSwapping([pivot, pivot-1]);
                await new Promise(promise => setTimeout(promise, speed));
                let cArray = [...array];
                swap(cArray, pivot, pivot-1);
                array[pivot] = cArray[pivot];
                array[pivot-1] = cArray[pivot-1];
                setSwapping([pivot-1, pivot]);
                await new Promise(promise => setTimeout(promise, speed));
                setArray(cArray);
                await new Promise(promise => setTimeout(promise, speed));
                setSwapping(null)
                setPivot(pivot-1);
                
                setSwapping([pivot, curr]);
                await new Promise(promise => setTimeout(promise, speed));
                cArray = [...array];
                swap(cArray, pivot, curr);
                array[pivot] = cArray[pivot];
                array[curr] = cArray[curr];
                setSwapping([curr, pivot]);
                await new Promise(promise => setTimeout(promise, speed));
                setArray(cArray);
                await new Promise(promise => setTimeout(promise, speed));
                setSwapping(null)
                setPivot(curr);
            }
            --pivot;
            setPivot(pivot);
        } else {
            ++curr;
        }
        
    }
    

    await quickSort(array, start, pivot-1, setArray, setPivot, setSwapping, setSorted2, speed);
    await quickSort(array, pivot+1, end, setArray, setPivot, setSwapping, setSorted2, speed);
    setSorted2(state => [...state, pivot]);
    setPivot(null)
};

export default quickSort;