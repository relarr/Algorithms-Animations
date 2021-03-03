const swap = (array, loc1, loc2) => {
    const tmp = array[loc1];
    array[loc1] = array[loc2];
    array[loc2] = tmp;
};

export default swap;