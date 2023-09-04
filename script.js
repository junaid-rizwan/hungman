const hungMenImage=document.querySelector(".hungman-box img");
const keyboardDiv=document.querySelector(".keyboard");
const wordDisplay=document.querySelector(".word-display");
const guessesText=document.querySelector(".guess-text b");
const gameModel=document.querySelector(".game-model");
const playAgain=document.querySelector(".play-again");


let currentWord,correctLetters,wrongGuessCount ;
const maxGuesses=6;

const resetGame=()=>{
    // resetting all game variables and ui elements.
    correctLetters=[];
    wrongGuessCount=0;
    wordDisplay.innerHTML=currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");
    guessesText.innerText=`${wrongGuessCount} /${maxGuesses}`;
    hungMenImage.src=`images/hangman-${wrongGuessCount}.svg`;
    keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false);



}


const getRandomWord=()=>{

    const wordList= [
        {word: "apple", hint: "A red or green fruit often used to make pies."},
        {word: "banana", hint: "A yellow fruit with a curved shape."},
        {word: "computer", hint: "A device used for various tasks, including gaming and word processing."},
        {word: "elephant", hint: "A large, gray mammal known for its long trunk."},
        {word: "football", hint: "A popular sport played with a round ball and feet."},
        {word: "guitar", hint: "A musical instrument with strings."},
        {word: "hamburger", hint: "A popular fast-food sandwich."},
        {word: "internet", hint: "A global network that connects computers."},
        {word: "jazz", hint: "A genre of music known for its improvisation."},
        {word: "kangaroo", hint: "A marsupial native to Australia."},
        {word: "leopard", hint: "A spotted big cat."},
        {word: "mountain", hint: "A tall landform that often has snow at its peak."},
        {word: "notebook", hint: "A book for writing notes or taking notes."},
        {word: "oxygen", hint: "A gas essential for human respiration."},
        {word: "penguin", hint: "A flightless bird found in the Antarctic."},
        {word: "queen", hint: "The female ruler of a kingdom."},
        {word: "rocket", hint: "A vehicle that travels into space."},
        {word: "sunflower", hint: "A tall, yellow flower that follows the sun."},
        {word: "tiger", hint: "A large, striped big cat."},
        {word: "umbrella", hint: "A device used to protect against rain."},
        {word: "volcano", hint: "A mountain that can erupt with lava and ash."},
        {word: "watermelon", hint: "A juicy, green and pink fruit."},
        {word: "xylophone", hint: "A musical instrument with wooden bars."},
        {word: "yacht", hint: "A luxurious boat used for sailing."},
        {word: "zebra", hint: "A black and white-striped animal from Africa."}
      ]
    
  
    const { word,hint }= wordList[Math.floor(Math.random()*wordList.length)];
    currentWord=word;
    resetGame();
    console.log(word,hint);
    document.querySelector(".hint-text b").innerText=hint;
   
    

}
const gameOver=(isVictory)=>{
    setTimeout(()=>{
        const modelText=isVictory?`you found the word:`:`the correct word was:`;
        gameModel.querySelector("img").src=`images/${isVictory?'victory':'lost'}.gif`;
        gameModel.querySelector("h4").innerText=`images/${isVictory?'Congrats!':'Game Over!'}`;

        gameModel.querySelector("p").innerHTML=`${modelText} <b>${currentWord}</b>`
        gameModel.classList.add("show");
        

    },300)
}

const initGame=(button,clickedLetter)=>{
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter,index) => {
            if(letter===clickedLetter){
               wordDisplay.querySelectorAll("li")[index].innerText=letter; 
               correctLetters.push(letter);
               wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            
            }
        });

    }
    else{
        wrongGuessCount++;
        hungMenImage.src=`images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled=true;
    guessesText.innerText=`${wrongGuessCount} /${maxGuesses}`;

    //calling gameover functions.
    if(wrongGuessCount===maxGuesses) return gameOver(false);
    if(correctLetters.length===currentWord.length) return gameOver(true);

}

// creating keybord buttons.
for(let i=97;i<=122;i++){
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);

    keyboardDiv.appendChild(button);
    button.addEventListener("click",e=>initGame(e.target,String.fromCharCode(i))); 
}
getRandomWord();

playAgain.addEventListener("click",getRandomWord)

