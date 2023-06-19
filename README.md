# wordle_replica
Recreating Wordle as practice for API call and user input

## Project Information
**Project Title:** Wordle Replica  
**Project Languages:** HTML, CSS, JavaScript(Vanilla)  
**Project Referenced From:** [Wordle](https://www.nytimes.com/games/wordle/index.html)  
  
**Project Description:**   
This project is an attempt to re-create the popular web-game "Wordle", originally created by Josh Wardle.

Upon each page refresh, a new word is loaded for the user to guess. The user has to guess the word in 6 tries. If the letter and its position is correct, the tile turns green. If that letter is present in the word, but isn't in the correct position, the tile turns yellow. 


  
## Project Specifics
**Things I Learned**  
- JavaScript's Fetch() function and how to deal with APIs and their data  
- How to access the children nodes of a specific parent node  
- How to iterate sequentialls over elements if they have the same names with a numbered suffix  
- How to change the focus of an element, in addition to autofocus  
- The onkeypress event, and how to use it/place it where the user doesn't need to select the specific field to write in  
- Using an event listener for keydown events (and to prevent repeat, use keyup event listener and a boolean to keep track if keydown event has occurred)  
- How to change the colours shown for an element in focus and when active using CSS

**Things I Enjoyed**
- Getting the look to be as close as possible to the original source material  
- Learning how to access child nodes

**Things I'd Do Differently**  
- Start the project mobile-first, or look into responsive web design before starting the project (in the planning phase)  
- Be more like the actual Wordle game in which a new word is selected every day, not upon every refresh

**Challenges That Were Faced**  
- How to make a responsive page  
- Figuring out how to access only 1 row of input fields and editing the properties of those fields, specific to that row  
- How to access information from API calls, and how to use status codes to identify if the result from the API call's response exists 
- Preventing certain functions from bouncing

