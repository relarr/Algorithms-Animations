import swap from './swap';

const bubbleSort = async (array, setArray, setSorting, setSorted, speed) => {
    for (let j = array.length; j >= 0; --j){
        for (let i = 0; i < array.length-1; ++i){
            setSorting(i);
            if (array[i] > array[i+1]){
              await new Promise(promise => setTimeout(promise, speed));
              let cArray = [...array];
              swap(cArray, i, i+1);
              array[i] = cArray[i];
              array[i+1] = cArray[i+1];
              setArray(cArray);
            }
        }
        setSorted(j-1);
    }
};

export default bubbleSort;