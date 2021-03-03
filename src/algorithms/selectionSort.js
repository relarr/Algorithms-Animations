import swap from './swap';

const selectionSort = async (array, setArray, setPivot, setSorting, setSorted, speed) => {
    for (let i = 0; i < array.length; ++i){
        setPivot(i);
        let j = i+1;
        let currMin = i;
        for (j; j < array.length; ++j){
          setSorting(j);
          await new Promise(promise => setTimeout(promise, speed));
          if (array[j] < array[currMin]){
            currMin = j;   
          }
        }
        if (array[currMin] < array[i]){
          await new Promise(promise => setTimeout(promise, speed));
          const cArray = [...array];
          swap(cArray, i, currMin);
          array[currMin] = cArray[currMin];
          array[i] = cArray[i];
          setArray(cArray);
        }
        setSorted(i);
    }
};

export default selectionSort;