// Global variables
const tools = ["rock", "paper", "scissors"];
const callbacks = [null, null, null];
const toolImgs = {
    rock: "./imgs/rock.jpeg",
    paper: "./imgs/paper.jpeg",
    scissors: "./imgs/scissors.jpeg"
}
const winScore = 3;
const numTools = 3;
let computerScore;
let playerScore;

// Setup
makeCallbackFunctions();

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

function playRound(playerSelection) {
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
    if (playerSelection === computerSelection) { return "tie"; }
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

function makeCallbackFunctions() {
    for (let i = 0; i < numTools; i++) {
        callbacks[i] = () => {console.log(tools[i]);};
    }
}

function setEventListeners(state) {
    for (let i = 0; i < numTools; i++) {
        let target = document.querySelector(`.tool-choices > .tool-container.${tools[i]}`);
        if (state === true) {
            target.addEventListener("click", callbacks[i], false);
        }
        else {
            target.removeEventListener("click", callbacks[i], false);
        }
    }
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
    if (parsePlayer(player) == undefined) {
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
    if (parsePlayer(player) == undefined) {
        return;
    }

    const currentMoveImg = document.querySelector(`.player-column.${player} .current-choice.tool-container > img`);
    currentMoveImg.src = toolImgs[tool];
    const currentMove = document.querySelector(`.player-column.${player} .current-choice.tool-container`);
    currentMove.style.visibility = "visible";
    setTimeout((move) => {move.style.visibility = "hidden";}, 4*1000, currentMove);
}

function parsePlayer(player) {
    if (player !== "human" && player !== "computer") {
        console.log("Misspelled player name.");
        return undefined;
    }
    return player;
}