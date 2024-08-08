
let player = {
    name: "",
    money: 200
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el")

// game initialization function
function initializeGame() {
    player.name = prompt("Welcome to Blackjack! Please enter your name:", "Player");
    if (!player.name) player.name = "Player"; // Default name if user cancels prompt
    playerEl.textContent = player.name + ": $" + player.money;
    startGame();
}

// get random card function
function getRandomCard() { 
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if  (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    };
}

// function to start the game
function startGame(){
    cards = [];  // Reset cards array
    sum = 0;     // Reset sum
    hasBlackJack = false;
    isAlive = false;
    runGame();
};

// function for game operation
function runGame() {
    isAlive = true;
    if (cards.length === 0) {  // Only draw new cards if it's a new game
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        cards = [firstCard, secondCard];
        sum = firstCard + secondCard;
    }

    // display all cards
    cardsEl.textContent = "Cards: " + cards.join(" + ");
    // display sum of all the cards on the page
    sumEl.textContent = "Sum: " + sum;
    
    // checking if under 21 - draw card?
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    }
    // equal to 21 - win
    else if (sum === 21) {
        message = " You've got Blackjack!"
        hasBlackJack = true
    }
    // over 21 - bust
    else {
        message = "You're out of the game!"
        isAlive = false
    }
    // display the message in the message-El
    messageEl.textContent = message
}

// if the player wants to draw a new card
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        runGame(); // This will update the display with the new card
    } else {
        message = "You can't draw a new card. The game is over."
        messageEl.textContent = message;
    }
}
