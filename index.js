let value;


async function fetchWord(){
    let url = 'https://random-word-api.vercel.app/api?words=1&length=5';
  
    try {
        const response = await fetch(url);
        const word = await response.json();
        return word;
    }
   catch (error) {
    console.error(error);
   }

}
  

function checkInput(){
    console.log(value);
}

function changeColour(){
    document.getElementById("field1").style.backgroundColor = "green";
}


async function main(){
    const word = await fetchWord();
    value = word[0];


    console.log(`the word is ${value}`);
    
}





main();





