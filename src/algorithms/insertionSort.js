import swap from './swap';

const insertionSort = async (array, setArray, setSorting, setSorted, speed) => {
    for (let i = 1; i < array.length; ++i){
        let j = i;
        while (array[j] < array[j-1] && j >= 0){
            setSorting(j);
            await new Promise(promise => setTimeout(promise, speed));
            const cArray = [...array];
            swap(cArray, j, j-1);
            array[j] = cArray[j];
            array[j-1] = cArray[j-1];
            setArray(cArray);

            --j;
        }
        setSorted(i);
    }
};

export default insertionSort;
