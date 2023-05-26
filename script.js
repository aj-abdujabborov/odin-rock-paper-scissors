// Global variables
const moves = ["rock", "paper", "scissors"];
const winScore = 3;
let computerScore;
let playerScore;

showScore(0, "human");

// Play
// playGame();

function playGame() {
    computerScore = 0;
    playerScore = 0;

    let gameFinished = false;
    while (!gameFinished) {
        playRound();
        if (computerScore === winScore) {
            alert(`The computer won! :(. Will reset game.`);
            gameFinished = true;
        }
        else if (playerScore === winScore) {
            alert('You won!. Will reset game.');
            gameFinished = true;
        }
    }

    playGame();
}

function playRound() {
    const playerSelection = getUserChoice();
    const computerSelection = getComputerChoice();
    const winner = getWinnerOfRound(playerSelection, computerSelection);
    updateScore(winner);
    sendWinAlert(winner, playerSelection, computerSelection);
}

function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    const num = Math.floor(Math.random() * 3);
    return options[num];
}

function getWinnerOfRound(playerSelection, computerSelection) {
    // Tie?
    if (playerSelection === computerSelection) {
        return "tie";
    }

    // Move combo
    const combo = (playerSelection + "-" + computerSelection).toLowerCase();

    // Find winner
    const winList = ["paper-rock", "scissors-paper", "rock-scissors"];
    for (const winCombo of winList) {
        if (combo === winCombo) {
            return "player";
        }
    }
    return "computer";
}

function getUserChoice() {
    let choice = prompt("Enter your choice").toLowerCase();
    for (const move of moves) {
        if (choice === move) {
            return choice;
        }
    }
    alert(`${choice} is an invalid move.\nChoose between "rock", "paper", and "scissors".`);
    getUserChoice();
}


function sendWinAlert(winner, playerSelection, computerSelection) {
    let outcome = "";
    let playerPrefix = computerPrefix = '';
    if (winner === "player") {
        playerPrefix += '+';
    }
    else if (winner === "computer") {
        computerPrefix += '+';
    }

    outcome += `${playerSelection} against ${computerSelection}\n`;
    outcome += `${playerPrefix}You: ${playerScore}. ${computerPrefix}Computer: ${computerScore}`;
    alert(outcome);
}

function updateScore(winner) {
    if (winner == "player") {
        ++playerScore;
    }
    else if (winner == "computer") {
        ++computerScore;
    }
}

function showScore(score, player) {
    if (player !== "human" && player !== "computer") {
        console.log("Misspelled player name.");
        return;
    }

    for (let i = 1; i <= winScore; i++) {
        let star = document.querySelector(`.star-${i}-${player}`);
        if (i <= score) {
            star.style.visibility = 'visible';
        }
        else {
            star.style.visibility = 'hidden';
        }
    }
}

function showMove(tool, player) {
    
}