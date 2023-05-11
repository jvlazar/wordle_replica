let word;
let rowNumber = 1;
let maxRowNumber = 6;
let maxFieldNumber = 5;
let fieldNumber = 0;


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
    console.log(`changing avialability of ${rowNumber} row`)
    var childNodes = document.getElementById("row"+rownum).getElementsByTagName(`*`);
        for (let i = 0; i < childNodes.length; i++){
            // enabling the current row's fields 
            childNodes[i].disabled = !childNodes[i].disabled;
        }
        if (rownum != 1){
            childNodes[0].focus();
        }
        fieldNumber = 0;
       
}


  
// for keyboard input
function getInput(){
  
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
         
        ustr=ustr.toLowerCase();
        // the user hasn't filled all squares out
        if (ustr.length != 5){
            document.getElementById(`message`).innerHTML = "Please fill in all squares";
            setAvailability(rowNumber);
            return;
        } else {
            if (checkInput(ustr)){
                document.getElementById("message").innerHTML = `SUCCESS! The word is "${word}"`;
                if (rowNumber == maxRowNumber){
                     setAvailability(rowNumber);
                }
                return;
            } else if (rowNumber <= maxRowNumber){
                setAvailability(rowNumber);
            } else {
                document.getElementById(`message`).innerHTML = `You've run out of guesses. The correct word is "${word}"`;
                setAvailability(rowNumber);
                return;
            }
        }
}

// compare user input to word
function checkInput(str){
    console.log(`row number is ${rowNumber}`);
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

    // TODO -- fix bug where yellow first appears, then if you add the same letter twice, it remains gray
    // get all the green values
    for (let i = 0; i < str.length; i++){
        if (str[i] == word[i]){
            changeColourInput("green", (i));
            changeColourKeyboard("green", str[i]);
            greenCount++;
        }
        else if (word.includes(str[i])){
            // if the input has more letters than necessary, leave color
            if (Number(inputMap.get(str[i])) >  Number(map.get(str[i]))){
                changeColourInput("rgb(73, 73, 73)", i);
               
            } else {
                // get all the yellow values
                changeColourInput("rgb(255, 218, 36)", i);
                changeColourKeyboard("rgb(255, 218, 36)", str[i]);
            }
        } else {
            // the letter does not appear in the word
            changeColourKeyboard("rgb(110, 110, 110)", str[i]);
        }
    }

    if (greenCount == 5){
        return true;
    } else {
        rowNumber+=1;
        console.log(`increasing number to ${rowNumber}`);
        return false;
    }

}


function changeColourInput(colour, id){
    var parent = document.getElementById("row"+rowNumber);
    parent.children[id].style.backgroundColor= colour;
}


function changeColourKeyboard(colour, id){
    document.getElementById(id).style.backgroundColor = colour;
}


function movetoNext(current, nextFieldID) { 
    fieldNumber += 1;
    // get children nodes and the current field
    var childNodes = document.getElementById("row"+rowNumber).getElementsByTagName(`*`); 
    if (current.value.length >= current.maxLength && nextFieldID != 5) {  
        document.getElementById("row"+rowNumber).getElementsByTagName(`input`)[nextFieldID].focus();
   
    }  
}


function moveToPrevious(){
    console.log(`pressing delete`);
    var childNodes = document.getElementById("row"+rowNumber).getElementsByTagName('input');
    if (fieldNumber != 0){
        document.getElementById("row"+rowNumber).getElementsByTagName(`input`)[fieldNumber-1].value = "";
        document.getElementById("row"+rowNumber).getElementsByTagName(`input`)[fieldNumber-1].focus();
        fieldNumber -= 1;
    }
}

function addInput(letter){
    console.log(`the letter selected is ${letter}`);
    if (fieldNumber <= maxFieldNumber){
        document.getElementById("row"+rowNumber).getElementsByTagName(`input`)[fieldNumber].value = letter;
        //document.getElementById("field"+fieldNumber).value = letter;
        fieldNumber+=1;
    }
}


async function main(){
    // clears the fields on refresh
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





