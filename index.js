let word;
let rowNumber = 1;
let maxRowNumber = 6;
let maxFieldNumber = 5;


async function fetchWord(){
    let url = 'https://random-word-api.vercel.app/api?words=1&length=5';
  
    try {
        const response = await fetch(url);
        const value = await response.json();
        return value;
    }
   catch (error) {
    console.error(error);
   }

}

function setAvailability(rownum){
    var childNodes = document.getElementById("row"+rownum).getElementsByTagName(`*`);
        for (let i = 0; i < childNodes.length; i++){
            // disabling the current row's fields 
            childNodes[i].disabled = false;
        }
}
  

function getInput(){
    let isCorrect;
    // TODO -- check to see if all fields are filled
   
    // iterating through rows
   
        // getting all the elements from the current row
        let ustr = "";
        var childNodes = document.getElementById("row"+rowNumber).getElementsByTagName(`*`);
        for (let i = 0; i < childNodes.length; i++){
            console.log(childNodes[i].value);
            // storing value of current node
            ustr += childNodes[i].value;
            // disabling the current row's fields 
            childNodes[i].disabled = true;
        }
        console.log(ustr);
        checkInput(ustr)
        if (checkInput(ustr)){
            console.log(`success, you guess the right word!`);
         
        } else {
            rowNumber+=1;
            setAvailability(rowNumber);
        }

    
    



    /*
    for (let i = 1; i <= maxRowNumber; i++){
        let userInput= "";
        for (let j = 1; j <= maxFieldNumber ; j++){
            let letter = document.getElementById('field'+j).value;
            userInput += letter;
        }
        isCorrect = checkInput(userInput);
        console.log(`done reading, input is ${isCorrect}, with user value ${userInput}`);
        if (isCorrect){
            console.log(`you guessed the correct word!`);
            break;
        } else {
           
           
            
        }
        
    }


    for (let i = 1; i < 6; i++){
        let letter = document.getElementById('field'+i).value;
        userInput += letter;
    
    isCorrect = checkInput(userInput);
    console.log(`looking at ${userInput}`);
    iteration++;
  */
   
}


function checkInput(str){
    // storing the letters and values of word in map
    var map = new Map();
    var inputMap = new Map();
    var greenCount = 0;

    // get the number of times each letter appears
    for (let i = 0; i < word.length; i++){
        // if the map doens't contain the letter, add to map
        if (!map.has(word[i])){
            map.set(word[i], 1);
        } else {
            // map has the word, update the value
            var count = map.get(word[i]) + 1;
            map.set(word[i], count);
        }
    }
   
    for (const x of map.entries()) {
        console.log(x);
    }

    console.log("\n");
    
    for (let i = 0; i < str.length; i++){
        if (!inputMap.has(str[i])){
            inputMap.set(str[i], 1);
        } else {
            // map has the word, update the value
            var count = inputMap.get(str[i]) + 1;
            inputMap.set(str[i], count);
        }
    }

    for (const x of inputMap.entries()) {
        console.log(x);
    }

    console.log(`str length is ${str.length}`);
    // get all the green values
    for (let i = 0; i < str.length; i++){
        console.log(`looking at input ${str[i]} and word ${word[i]}`)
        if (str[i] == word[i]){
            changeColour("green", `field`+(i+1));
            greenCount++;
        }
        else if (word.includes(str[i])){
            // if the input has more letters than necessary, leave color
            if (Number(inputMap.get(str[i])) >  Number(map.get(str[i]))){
                console.log(`the color of ${str[i]} remains the same at position ${i+1}`);
                changeColour("rgb(73, 73, 73)", `field`+(i+1));
            } else {
                console.log(`changing the color of ${str[i]}`);
                // get all the yellow values
                changeColour("rgb(255, 218, 36)", `field`+(i+1));

            }
        } 
    }
    if (greenCount == 5){
        return true;
    } else {
        return false;
    }
   
    

}


function changeColour(colour, id){
    //var element = document.getElementById("row"+rowNumber).getElementById(id);
    //console.log(`element is ${element}`);
    document.getElementById(id).style.backgroundColor = colour;
}


async function main(){
    const value = await fetchWord();
    //word = value[0];
    word = "hello";

    console.log(`the word is ${word}`);
    
}





main();





