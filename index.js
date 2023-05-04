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
   const array = [];

    // get the number of times each letter appears
    for (let i = 0; i < word.length; i++){
        array[i]= word.split(word[i]).length - 1;
    }

    for (let i = 0; i < array.length; i++){
        console.log(`the counts for letter ${word[i]} is ${array[i]}`)
    }

   // get all the green values
    for (let i = 0; i < str.length; i++){
        if (str[i] == word[i]){
            console.log(`the letters are the same in position ${i+1}`)
            changeColour("green", `field`+(i+1));
        }
        else if (word.includes(str[i]) && (word.split(word[i]).length - 1) >= 1){
            // get all the yellow values
            changeColour("yellow", `field`+(i+1));
        } else {
            
        }
    }


}


function changeColour(colour, id){
    document.getElementById(id).style.backgroundColor = colour;
}


async function main(){
    const value = await fetchWord();
    word = "hello";


    console.log(`the word is ${word}`);
    
}





main();





