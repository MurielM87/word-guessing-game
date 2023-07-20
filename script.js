const inputs = document.querySelector('.inputs');
const resetBtn = document.querySelector('.reset_btn');
const hint = document.querySelector('.hint span');
const guessLeft = document.querySelector('.guess_left span');
const wrongLetter = document.querySelector('.wrong_letter span');
const typingInput = document.querySelector('.typing_input');

let word;
let maxGuesses;
let corrects = [];
let incorrects = [];

function randomWord() {
    //getting random object from wordlist
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word; //getting word of random object
    maxGuesses = 8;
    corrects = [];
    incorrects = [];
    console.log(ranObj);

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord()

function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(`${key}`) && !corrects.includes(key)) {
        console.log(key);
        if (word.includes(key)) { //if user letter found in the word
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--; //decrement maxGuesses by 1
            incorrects.push(`${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects;
    };
    typingInput.value = "";

    setTimeout(() => {
        if (corrects.length === word.length) {
            alert(`Congrats! You found the word ${word.toUpperCase()}`)
            randomWord();
        } else if (maxGuesses < 1) {//if all letters not found
            alert("GAME OVER");
            for (let i = 0; i < word.length; i++) {
                //show all letters in the input
                inputs.querySelectorAll('input')[i].value = word[i];
            }
        }
    });

}

resetBtn.addEventListener('click', randomWord);
typingInput.addEventListener('input', initGame);
inputs.addEventListener('click', () => typingInput.focus());
document.addEventListener('keydown', () => typingInput.focus());