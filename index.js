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
            // enabling the current row's fields 
            childNodes[i].disabled = !childNodes[i].disabled;
        }
}
  

function getInput(){
  
    // TODO -- check to see if all fields are filled
    document.getElementById(`message`).innerHTML = "";
   
    // getting all the elements from the current row
    let ustr = "";
    
        var childNodes = document.getElementById("row"+rowNumber).getElementsByTagName(`*`);
        for (let i = 0; i < childNodes.length; i++){
            // storing value of current node
            ustr += childNodes[i].value;
            // disabling the current row's fields 
            childNodes[i].disabled = true;
        }
    
        if (ustr.length != 5){
            document.getElementById(`message`).innerHTML = "Please fill in all squares";
            setAvailability(rowNumber);
            return;
        } else {
            checkInput(ustr)
            if (checkInput(ustr)){
                document.getElementById("message").innerHTML = `SUCCESS! The word is "${word}"`;
                return;
                
            } else if (rowNumber < maxRowNumber){
                rowNumber+=1;
                setAvailability(rowNumber);
            } else {
                document.getElementById(`message`).innerHTML = `You've run out of guesses. The correct word is "${word}"`;
                return;
            }
        }
    
    
    
    
   
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
   
    for (let i = 0; i < str.length; i++){
        if (!inputMap.has(str[i])){
            inputMap.set(str[i], 1);
        } else {
            // map has the word, update the value
            var count = inputMap.get(str[i]) + 1;
            inputMap.set(str[i], count);
        }
    }

    // get all the green values
    for (let i = 0; i < str.length; i++){
        if (str[i] == word[i]){
            changeColour("green", (i));
            greenCount++;
        }
        else if (word.includes(str[i])){
            // if the input has more letters than necessary, leave color
            if (Number(inputMap.get(str[i])) >  Number(map.get(str[i]))){
                changeColour("rgb(73, 73, 73)", i);
            } else {
                // get all the yellow values
                changeColour("rgb(255, 218, 36)", i);

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
    var parent = document.getElementById("row"+rowNumber);
    parent.children[id].style.backgroundColor= colour;
}


async function main(){
    
    window.onload = function() {
        var inputs;
        var index;

        inputs = document.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            // deal with inputs[index] element.
            inputs[i].value = "";
        }
    }
    const value = await fetchWord();
    word = value[0];
    //word = "hello";

    //console.log(`the word is ${word}`);
    
}





main();





