let word;
let rowNumber = 1;
let maxRowNumber = 6;
let maxFieldNumber = 5;
let fieldNumber = 0;

// get random word
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

// activates the shake property for the specific row, called when error message appears
function shakeRow(rowNumber){
    document.getElementById("row"+rowNumber).style.animation = "shake 0.5s";
    document.getElementById("row"+rowNumber).style.animationIterationCount = 2;
    
}

// timer for error message
function messageTimer(element){
    console.log(`error message`);
    setTimeout(function(){
        document.getElementById(element+"_div").style.zIndex = 99;
        document.getElementById(element+"_div").style.opacity = 1;
        document.getElementById(element).innerHTML = 'Not enough letters';
        shakeRow(rowNumber);
    }, 1);
    
    setTimeout(function(){
        document.getElementById(element+"_div").style.zIndex = 0;
        document.getElementById(element+"_div").style.opacity = 0;
        document.getElementById(element).innerHTML = '';
        document.getElementById("row"+rowNumber).style.animation = "none";
    }, 2000);
}


// after clicking the enter button or clicking the enter key on keyboard
function getInput(){
  
    // getting all the elements from the current row
    let ustr = "";
    
    var childNodes = document.getElementById("row"+rowNumber).getElementsByTagName(`input`);
    for (let i = 0; i < childNodes.length; i++){
        // storing value of current node
        ustr += childNodes[i].value;
        // disabling the current row's fields 
       
        childNodes[i].disabled = false;
    }
         
    ustr=ustr.toLowerCase();
    // the user hasn't filled all squares out
    if (ustr.length != 5){
        fieldNumber = 0;
        return;
    } else {
        if (checkInput(ustr)){
            
            document.getElementById("message").innerHTML = `SUCCESS! The word is "${word}"`;
            if (rowNumber == maxRowNumber){
                fieldNumber = 0;
            }
            return;
        } else if (rowNumber <= maxRowNumber){
            fieldNumber = 0;
        } else {
            document.getElementById(`message`).innerHTML = `You've run out of guesses. The correct word is "${word}"`;
            fieldNumber = 0;
            return;
        }
    }
}

// compare user input to word
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

    
    for (let i = 0; i < str.length; i++){
        if (str[i] == word[i]){
            changeColourInput("green", (i));
            changeColourKeyboard("green", str[i]);
            greenCount++;
        }
        else if (word.includes(str[i])){
            // if the input has more letters than necessary, leave color
            if (Number(inputMap.get(str[i])) >  Number(map.get(str[i]))){
                if (i >= Number(inputMap.get(str[i]))){
                    // keep as gray
                    changeColourInput("rgb(73, 73, 73)", i);
                } else {
                    // change to yellow
                    changeColourInput("rgb(255, 218, 36)", i);
                    changeColourKeyboard("rgb(255, 218, 36)", str[i]);
                }
               
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
        return false;
    }

}

// changes colour of the fields according to response
function changeColourInput(colour, id){
    var parent = document.getElementById("row"+rowNumber);
    parent.children[id].style.backgroundColor= colour;
}

// changes colour of the keyboard buttons on display
function changeColourKeyboard(colour, id){
    document.getElementById(id).style.backgroundColor = colour;
}

// deleting the current character and moving to previous field
function moveToPrevious(){
    if (fieldNumber > 0){
        document.getElementById("row"+rowNumber).getElementsByTagName(`input`)[fieldNumber-1].value = "";
        // if the current field number is less than the max, focus the current field
        if (fieldNumber < maxFieldNumber){
            document.getElementById("row"+rowNumber).getElementsByTagName(`input`)[fieldNumber].focus();
        } else {
            // else, focus the previous field
            document.getElementById("row"+rowNumber).getElementsByTagName(`input`)[fieldNumber-1].focus();
        }
        // decrement field number
        fieldNumber -= 1;
    }
}

// getting input from the buttons
function addInput(letter){
    // if the current field number is less than the max, then display the letter
    if (fieldNumber < maxFieldNumber){
        // add input to the current field and move current field to the next
        document.getElementById("row"+rowNumber).getElementsByTagName(`input`)[fieldNumber].value = letter;
        fieldNumber+=1;
    } 
}


// getting input from the keyboard, called by the listener when a key is pressed 
function addInputFromKeyboard(e){
    // check to see if user hit the enter key and the fields are all filled up
    if (e.which == 13 && fieldNumber == 5){
        getInput();
    } else if (e.keyCode == 13){
        // if the user hit the enter key but they haven't filled the squares, error message pops up
        messageTimer(`error_message`);
    } else if ((e.keyCode >= 65 && e.keyCode <=90) ){
        // TODO -- only allow letters, nothing else
        // if the user hits any other key, add to input
        addInput(String.fromCharCode(e.which)); 
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
            if (i != 0){
                inputs[i].disabled = true;
            }
        }
    }
    
    const value = await fetchWord();
    word = value[0];
   

    let down = false;
    // add an event listener to the body of the page, waiting for a keydown event
    document.getElementById(`body`).addEventListener('keydown', function(event){
        // turn repeat off (can't press down anymore)
        if(down) return;
        down = true;
        if (event.keyCode == 8){
            moveToPrevious();
        } else {
            addInputFromKeyboard(event);
        }
    });

    document.addEventListener('keyup', function () {
        down = false;
    }, false);
 
    
}





main();





