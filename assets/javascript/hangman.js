var username = prompt("What's your name?");
alert("Hello " + username + ", Let's play Hangman!");

//Word list
var wordList = ["ronin", "shogun", "bushido", "jujutsu", "seppuku", "shinto", "sake", "calligraphy", "tea",
 "tokyo", "osaka", "kyoto", "sushi", "samurai", "fuji"
];

var wordToGuess = "";

var lettersInWord = [];

var numOfBlanks = [];

//Array that holds the underscores
var underScores = [];

var wrongGuesses = [];

//Game counters
var wins = 0;
var losses = 0;
var counter = 0;
var guessesRemaining = 9;


//Wrong guess array
var wrongGuesses = [];

//Start game function
function startGame() {
    //Determining which word will be randomly guessed from the word list array
    var random = Math.floor(Math.random() * wordList.length);
    wordToGuess = wordList[random];
    console.log(wordToGuess);

    lettersInWord = wordToGuess.split("");
    console.log("Current word's letters are " + lettersInWord);

    numOfBlanks = lettersInWord.length;
    console.log("There are " + numOfBlanks + " letters in this word");

    guessesRemaining = 9;
    wrongGuesses = [];
    underScores = [];

    for (var l = 0; l < wordToGuess.length; l++) {
        underScores.push("_");
    }

    console.log(underScores);
    document.getElementById("underscores").innerHTML = underScores.join(" ");
    document.getElementById("nogr").innerHTML = guessesRemaining;
    document.getElementById("win-counter").innerHTML = wins;
};

function checkLetters(letter) {
    var correctLetter = false;
    for (var l = 0; l < numOfBlanks; l++) {
        if (wordToGuess[l] == letter) {
            correctLetter = true;
        }
    }

    if (correctLetter) {
        for (var e = 0; e < numOfBlanks; e++) {
            if (wordToGuess[e] == letter) {
                underScores[e] = letter;
            }
        }
    } else {
        wrongGuesses.push(letter);
        guessesRemaining--
    }
};

function roundOver() {
    console.log("Win count: " + wins + " | Loss Count: " + losses + " | Guesses Left: " + guessesRemaining)
    document.getElementById("nogr").innerHTML = guessesRemaining;
    document.getElementById("underscores").innerHTML = underScores.join(" ");
    document.getElementById("wrongguesses").innerHTML = wrongGuesses.join(" ");

    //Check if the user won
    if (lettersInWord.toString() == underScores.toString()) {
        wins++;
        alert("Congrats!  You guessed '" + wordToGuess + "' correctly. Drink another sake?");
        console.log("You are the very best!");

        // Update the wins in the HTML doc
        document.getElementById("win-counter").innerHTML = wins;

        //Start New Game and clear letters already guessed
        startGame();
    } else if (guessesRemaining == 0) { //Check if user lost
        losses++;
        alert("Honorable Death, You have 0 guesses left.  The word was '" + wordToGuess + "'. Play again?")

        // Update the wins in the HTML doc
        document.getElementById("losses").innerHTML = losses;

        //Start New Game
        startGame();
    }
};

startGame();
document.onkeyup = function(event) {
    var lettersGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    console.log("You guessed " + lettersGuessed);
    checkLetters(lettersGuessed);
    roundOver();
};