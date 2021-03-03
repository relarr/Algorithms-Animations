const merge = async (array, start, mid, end, setArray, setSorting, setSorted, speed) => {
    const left = [];
    const right = [];
    for (let i = 0; i < mid-start+1; ++i) left.push(array[start+i]);
    for (let i = 0; i < end-mid; ++i) right.push(array[mid+i+1]);

    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length){
        setSorting(start);
        if (left[leftIndex] <= right[rightIndex]){
            await new Promise(promise => setTimeout(promise, speed));
            const cArray = [...array];
            cArray[start] = left[leftIndex];
            array[start] = cArray[start];
            setArray(cArray);

            ++leftIndex;
        } else {
            await new Promise(promise => setTimeout(promise, speed));
            const cArray = [...array];
            cArray[start] = right[rightIndex];
            array[start] = cArray[start];
            setArray(cArray);

            ++rightIndex;
        }
        ++start;
        setSorted(start);
    }

    while (leftIndex < left.length){
        setSorting(start);
        await new Promise(promise => setTimeout(promise, speed));
        const cArray = [...array];
        cArray[start] = left[leftIndex];
        array[start] = cArray[start];
        setArray(cArray);

        ++leftIndex;
        ++start;
        setSorted(start);
    }

    while (rightIndex < right.length){
        setSorting(start);
        await new Promise(promise => setTimeout(promise, speed));
        const cArray = [...array];
        cArray[start] = right[rightIndex];
        array[start] = cArray[start];
        setArray(cArray);

        ++rightIndex;
        ++start;
        setSorted(start);
    }
};

const mergeSort = async (array, start, end, setArray, setSorting, setSorted, speed) => {
    if (end <= start) return;

    const mid = Math.floor((start+end)/2);
    await mergeSort(array, start, mid, setArray, setSorting, setSorted, speed);
    await mergeSort(array, mid+1, end, setArray, setSorting, setSorted, speed);
    await merge(array, start, mid, end, setArray, setSorting, setSorted, speed);
};

export default mergeSort;