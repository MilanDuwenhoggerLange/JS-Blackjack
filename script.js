
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
let dealerSum = 0;
let dealerCards = [];

// game initialization function
function initializeGame() {
    player.money = 200; // Reset money to starting amount
    playerEl.textContent = "Player: $" + player.money;
    
    // Reset button states
    let startButton = document.getElementById("start-button");
    startButton.disabled = false;
    startButton.textContent = "START GAME";
    document.getElementById("new-card-button").disabled = true;
    document.getElementById("hold-button").disabled = true;
    if (document.getElementById("play-again-button")) {
        document.getElementById("play-again-button").style.display = "none";
    }
}

// function to reset the game, funds and button text
function resetGame() {
    player.money = 200; // Reset money to starting amount
    let startButton = document.getElementById("start-button");
    startButton.disabled = false;
    startButton.textContent = "START GAME";
    document.getElementById("new-card-button").disabled = false;
    document.getElementById("hold-button").disabled = false;
    document.getElementById("play-again-button").style.display = "none";
    initializeGame();
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
function startGame() {
    if (player.money < 5) {
        message = "You don't have enough money to play. Game over.";
        messageEl.textContent = message;
        document.getElementById("start-button").disabled = true;
        document.getElementById("new-card-button").disabled = true;
        document.getElementById("hold-button").disabled = true;
        return;
    }

    // Prompt for player's name if it's not set
    if (!player.name || player.name === "Player") {
        player.name = prompt("Welcome to Blackjack! Please enter your name:", "Player");
        if (!player.name) player.name = "Player"; // Default name if user cancels prompt
        playerEl.textContent = player.name + ": $" + player.money;
    }

    player.money -= 5; // Deduct $5 at the start of each game
    cards = [];
    dealerCards = [];
    sum = 0;
    dealerSum = 0;
    hasBlackJack = false;
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    runGame();
    playerEl.textContent = player.name + ": $" + player.money; // Update money display
    
    // Enable game buttons
    document.getElementById("new-card-button").disabled = false;
    document.getElementById("hold-button").disabled = false;
    
    // Change start button text to "PLAY AGAIN"
    let startButton = document.getElementById("start-button");
    startButton.textContent = "PLAY AGAIN";
}

// function for game operation
function runGame() {
    cardsEl.textContent = "Your Cards: " + cards.join(" ");
    sumEl.textContent = "Your Sum: " + sum;
    
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
    } else {
        message = "You're out of the game!";
        isAlive = false;
    }
    messageEl.textContent = message;
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

// if the player is happy with their cards
function hold() {
    if (isAlive && !hasBlackJack) {
        isAlive = false; // Player's turn is over
        dealerPlay();
        determineWinner();
    } else {
        message = "You can't hold. The game is over or hasn't started.";
        messageEl.textContent = message;
    }
}

// the dealer plays their turn
function dealerPlay() {
    dealerCards = [getRandomCard(), getRandomCard()];
    dealerSum = dealerCards[0] + dealerCards[1];
    
    while (dealerSum < 17) {
        let newCard = getRandomCard();
        dealerCards.push(newCard);
        dealerSum += newCard;
    }
}

// a winner is determined
function determineWinner() {
    let result;
    if (sum > 21) {
        result = "You bust! Dealer wins.";
        // No need to deduct money here as it was already deducted at the start
    } else if (dealerSum > 21) {
        result = "Dealer busts! You win!";
        player.money += 10; // Win $10 ($5 bet + $5 profit)
    } else if (sum > dealerSum) {
        result = "You win!";
        player.money += 10; // Win $10 ($5 bet + $5 profit)
    } else if (sum < dealerSum) {
        result = "Dealer wins.";
        // No need to deduct money here as it was already deducted at the start
    } else {
        result = "It's a tie!";
        player.money += 5; // Return the $5 bet for a tie
    }
    
    message = result + " Your cards total: " + sum + "<br>" + "Dealer's cards total: " + dealerSum;
    messageEl.innerHTML = message;
    playerEl.textContent = player.name + ": $" + player.money;
}

// function to quit the game
function quitGame() {
    let finalMessage = `Thanks for playing, ${player.name}! You're leaving with $${player.money}.`;
    messageEl.textContent = finalMessage;
    isAlive = false;
    hasBlackJack = false;
    
    // Disable game buttons
    document.getElementById("new-card-button").disabled = true;
    document.getElementById("hold-button").disabled = true;
    
    // Change start button text back to "START GAME"
    let startButton = document.getElementById("start-button");
    startButton.textContent = "START GAME";
    startButton.disabled = false;

    // Reset player name
    player.name = "";

    // Reset player money to initial $200
    player.money = 200;
    playerEl.textContent = "Player: $" + player.money;
}

// function to reset the game
function resetGame() {
    player.money = 200; // Reset money to starting amount
    document.getElementById("start-button").disabled = false;
    document.getElementById("new-card-button").disabled = false;
    document.getElementById("hold-button").disabled = false;
    document.getElementById("play-again-button").style.display = "none";
    initializeGame();
}

window.onload = initializeGame;