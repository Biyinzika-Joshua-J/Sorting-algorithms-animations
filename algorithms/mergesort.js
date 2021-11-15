export const mergeSort = (array) => {
   let animations = [];
   if (array.length<=1) return array;
   let auxiliarayArray = array.slice();
   mergeSortHelper(array, 0, array.length-1,auxiliarayArray,animations);
   return animations;
}

function mergeSortHelper(array, start, end, auxiliarayArray, animations){
    if (start == end) return;
    const middleIndex = Math.floor((start+end)/2);
    mergeSortHelper(auxiliarayArray, start, middleIndex, array, animations);
    mergeSortHelper(auxiliarayArray, middleIndex+1, end, array, animations);
    merge(array, start, middleIndex, end, auxiliarayArray, animations);
}

function merge(array, start, middleIndex, end, auxiliarayArray, animations){
    let k = start;
    let i = start;
    let j = middleIndex+1;

    while (i<=middleIndex && j<=end){
        animations.push([i,j]);
        animations.push([i,j]);
       
        if (auxiliarayArray[i] <= auxiliarayArray[j]){
            animations.push([k, auxiliarayArray[i]])
            array[k++] = auxiliarayArray[i++];
        }else{
            animations.push([k, auxiliarayArray[j]])
            array[k++] = auxiliarayArray[j++];
        }
    }

    while (i<=middleIndex){
        animations.push([i,i])
        animations.push([i,i])
        animations.push([k,auxiliarayArray[i]])
        array[k++] = auxiliarayArray[i++];
    }

    while (j<=end){
        animations.push([j,j])
        animations.push([j,j])
        animations.push([k,auxiliarayArray[j]])
        array[k++] = auxiliarayArray[j++];
    }
}
