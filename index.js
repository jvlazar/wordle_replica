let word;
let rowNumber = 1;


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
  

function getInput(rownum){
    let userInput= "";
    for (let i = 1; i < 6; i++){
        let letter = document.getElementById('field'+i).value;
        userInput += letter;
    }
    checkInput(userInput);
    console.log(`looking at ${userInput}`);
}

function checkInput(str){
    // storing the letters and values of word in map
    var map = new Map();
    var inputMap = new Map();

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

    // get all the green values
    for (let i = 0; i < str.length; i++){
        console.log(`looking at input ${str[i]} and word ${word[i]}`)
        if (str[i] == word[i]){
            changeColour("green", `field`+(i+1));
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
        } else {
            // do nothing
            
        }
    }


}


function changeColour(colour, id){
    document.getElementById(id).style.backgroundColor = colour;
}


async function main(){
    const value = await fetchWord();
    word = value[0];


    console.log(`the word is ${value}`);
    
}





main();





