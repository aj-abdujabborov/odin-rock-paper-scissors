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
const playerScores = {
    human: 0,
    computer: 0
}

// Setup
makeCallbackFunctions();
setEventListeners(true);

function playGame() {
    let gameFinished = false;
    while (!gameFinished) {
        playRound();
        if (playerScores.computer === winScore) {
            alert(`The computer won! :(. Will reset game.`);
            gameFinished = true;
        }
        else if (playerScores.human === winScore) {
            alert('You won!. Will reset game.');
            gameFinished = true;
        }
    }

    playGame();
}

function playRound(playerSelection) {
    showMove(playerSelection, "human");
    const computerSelection = getComputerChoice();
    showMove(computerSelection, "computer");

    const winner = getWinnerOfRound(playerSelection, computerSelection);
    if (winner !== "tie") {
        showScore(++playerScores[winner], winner); // incrementing first
    }

    if (Math.max(playerScores.human, playerScores.computer) === winScore) {
        playerScores.human = 0;
        playerScores.computer = 0;
        showScore(playerScores.human, "human");
        showScore(playerScores.computer, "computer");
    }
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
            return "human";
        }
    }
    return "computer";
}

function makeCallbackFunctions() {
    for (let i = 0; i < numTools; i++) {
        callbacks[i] = () => {playRound(tools[i]);};
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

function showScore(score, player) {
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
    const currentMoveImg = document.querySelector(`.player-column.${player} .current-choice.tool-container > img`);
    currentMoveImg.src = toolImgs[tool];
    const currentMove = document.querySelector(`.player-column.${player} .current-choice.tool-container`);
    currentMove.style.visibility = "visible";
    setTimeout((move) => {move.style.visibility = "hidden";}, 3*1000, currentMove);
}
