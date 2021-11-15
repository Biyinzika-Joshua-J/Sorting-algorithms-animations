// imports
import { mergeSort } from "./algorithms/mergesort.js";

// grab DOM nodes
const generateArray = document.getElementById('generate_array');
const sortUsingMergeSort = document.getElementById('mergesort');
let barContainer = document.querySelector('.bars');

// Variables
let randomArray = [];

// functions
const generateRandomArray = () =>{
    randomArray = [];
    for (let i=0; i<400; i++){
        let randomNumber = Math.floor(Math.random()*500);
        randomArray.push(randomNumber);
    }
    return randomArray;
}


const generateNewArray = () =>{
    let returnedRandomArray = generateRandomArray();
    createBarsOnScreen(returnedRandomArray);
}

const createBarsOnScreen = (array) =>{
    barContainer.innerHTML = null;
    array.forEach((value, index)=>{
        let bar = document.createElement('div');
        bar.classList.add('column');
        bar.style.width = '10%';
        bar.style.height = `${value}px`;
        bar.style.backgroundColor = 'blue';
        //bar.style.margin = '0 5px 0 5px'
        barContainer.appendChild(bar);
    })
}

// generate random array on load
window.onload = function(){
    let array = generateRandomArray();
    createBarsOnScreen(array);
 }

const mergeSorter = () =>{
    let animations = mergeSort(randomArray);
   
    for (let i=0; i<animations.length; i++){
        let columns = document.querySelectorAll('.column');
        const isColorChange = i%3 !== 2;
        if (isColorChange){
            const [columnOneIndex, columnTwoIndex] = animations[i];
            let columnOne = columns[columnOneIndex].style;
            let columnTwo = columns[columnTwoIndex].style;
            const color = i%3 === 0?'red':'blue';
            setTimeout(() => {
                columnOne.backgroundColor = color;
                columnTwo.backgroundColor = color;
            }, i*5);
        }else{
            setTimeout(()=>{
                const [columnOneIndex, columnTwoIndex] = animations[i];
                let columnOne = columns[columnOneIndex].style;
                columnOne.height = `${columnTwoIndex}px`;
            }, i*5)
        }
    }

}

// events
generateArray.addEventListener('click', generateNewArray);
sortUsingMergeSort.addEventListener('click', mergeSorter);

