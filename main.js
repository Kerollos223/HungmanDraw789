// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {

  // Create Span
let span = document.createElement("span");

  // Create Letter Text Node
let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
span.appendChild(theLetter);

  // Add Class On Span
span.className = 'letter-box';

  // Append Span To The Letters Container
lettersContainer.appendChild(span);

});

// Object Of Words + Categories
const words = {
programming: ["php", "javascript", "bootstrap", "redux", "html", "css", "mysql", "python"],
movies: ["The Dark", "God Father", "La Casa De Papel", "Spider Man" , "Iron Man", "Hulk", "Lion King"],
people: ["Samy", "Romany", "Nagy", "Hanna", "Ghandi" , "Zoza" , "Gova" , "paula samer" , "Morcos" , "Ebram" , "bally"],
countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

// Variables to store game state
let randomPropName, randomValueValue, guessSpans, wrongAttempts, theDraw;

function startGame() {
  // Get Random Property
let allKeys = Object.keys(words);

  // Random Number Depend On Keys Length
  let randomPropNumber = Math.floor(Math.random() * allKeys.length);

  // Category
randomPropName = allKeys[randomPropNumber];

  // Category Words
let randomPropValue = words[randomPropName];

  // Random Number Depend On Words
  let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

  // The Chosen Word
randomValueValue = randomPropValue[randomValueNumber];

  // Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

  // Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

  // Clear previous guesses
lettersGuessContainer.innerHTML = '';

  // Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

  // Create Spans Depend On Word
lettersAndSpace.forEach(letter => {
    // Create Empty Span
    let emptySpan = document.createElement("span");

    // If Letter Is Space
    if (letter === ' ') {
      // Add Class To The Span
    emptySpan.className = 'with-space';
    }

    // Append Span To The Letters Guess Container
    lettersGuessContainer.appendChild(emptySpan);
});

  // Select Guess Spans
guessSpans = document.querySelectorAll(".letters-guess span");

  // Reset Wrong Attempts
wrongAttempts = 0;

  // Reset The Draw Element
theDraw = document.querySelector(".hangman-draw");
theDraw.className = 'hangman-draw';

  // Reset Letters
lettersContainer.classList.remove("finished");
document.querySelectorAll(".letter-box").forEach(box => {
    box.classList.remove("clicked");
});
}

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Choose Status
let theStatus = false;

if (e.target.className === 'letter-box') {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, WordIndex) => {
      // If The Clicked Letter Equal To One Of The Chosen Word Letter
    if (theClickedLetter == wordLetter) {
        // Set Status To Correct
        theStatus = true;

        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
        if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
        }
        });
    }
    });

    // Outside Loop

    // If Letter Is Wrong
    if (theStatus !== true) {
      // Increase The Wrong Attempts
    wrongAttempts++;

      // Add Class Wrong On The Draw Element
    theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
    document.getElementById("fail").play();

    if (wrongAttempts === 8) {
        endGame();

        lettersContainer.classList.add("finished");
    }

    } else {
      // Play Success Sound
    document.getElementById("success").play();

      // Check if the player has won
    let isWin = true;
    guessSpans.forEach(span => {
        if (span.innerHTML === '' && !span.classList.contains('with-space')) {
        isWin = false;
        }
    });

    if (isWin) {
        winGame();
    }
    }
}
});

// End Game Function
function endGame() {
  // Create Popup Div
let div = document.createElement("div");

  // Create Text
let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);

  // Append Text To Div
div.appendChild(divText);

  // Add Class On Div
div.className = 'popup';

  // Append To The Body
document.body.appendChild(div);

  // Display the full hangman
theDraw.className = 'hangman-draw wrong-8';

  // Restart game after 3 seconds
setTimeout(() => {
    div.remove();
    startGame();
}, 3000);
}

// Win Game Function
function winGame() {
  // Create Popup Div
let div = document.createElement("div");

  // Create Text
let divText = document.createTextNode(`Congratulations! You guessed the word: ${randomValueValue}`);

  // Append Text To Div
div.appendChild(divText);

  // Add Class On Div
div.className = 'popup';

  // Append To The Body
document.body.appendChild(div);

  // Restart game after 3 seconds
setTimeout(() => {
    div.remove();
    startGame();
}, 3000);
}

// Start the game initially
startGame();

