// imports
import { mergeSort } from "./algorithms/mergesort.js";
import { BubbleSort } from "./algorithms/bubblesort.js";

// grab DOM nodes
const generateArray = document.getElementById('generate_array');
const sortUsingMergeSort = document.getElementById('mergesort');
const sortUsingBubbleSort = document.getElementById('bubblesort');
let barContainer = document.querySelector('.bars');

// timer
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

// Variables
let randomArray = [];

// functions
const generateRandomArray = () =>{
    randomArray = [];
    for (let i=0; i<50; i++){
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
    randomArray = array;
    createBarsOnScreen(array);
 }

 // merge sort animation function
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

// Bubble sort animation function 
async function BubbleSorter(){
    let animations = BubbleSort(randomArray);
    let columns = document.querySelectorAll('.column');
    for (let i=0; i<animations.length; i++){
        if (animations[i-1]){
            if (animations[i-1][0] == animations[i][1] && animations[i-1][1] == animations[i][0]){
               
                let [columnTwoIndex, columnOneIndex] = animations[i];
                console.log(animations[i])
                let columnOne = columns[columnOneIndex].style;
                let columnTwo = columns[columnTwoIndex].style;
                let temp = columnOne.height;
                columnOne.height = columnTwo.height;
                columnTwo.height = temp;
                // console.log(columnOne.height,  columnTwo.height)
                  
            }else{
                let [columnOneIndex, columnTwoIndex] = animations[i];
                let columnOne = columns[columnOneIndex].style;
                let columnTwo = columns[columnTwoIndex].style;
                columnOne.backgroundColor = 'red';
                columnTwo.backgroundColor = 'red'; 
                await timer(1);
                columnOne.backgroundColor = 'blue';
                columnTwo.backgroundColor = 'blue'; 
            }
        }
    }
}






// events
generateArray.addEventListener('click', generateNewArray);
sortUsingMergeSort.addEventListener('click', mergeSorter);
sortUsingBubbleSort.addEventListener('click', BubbleSorter);
