export const BubbleSort = array =>{
   
    let animations = [];
    for (let i=0; i<array.length-1; i++){
        for (let j=0; j<array.length-i-1; j++){
            animations.push([j, j+1]);
            if (array[j] > array[j+1]){
                
                animations.push([j+1, j]);
            }
        }
    }

    return animations;
}