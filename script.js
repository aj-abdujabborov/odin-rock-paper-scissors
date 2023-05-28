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
const winToolShadow = "0 0 30px 8px rgba(255, 255, 255, 0.5)";
const winPlayerShadow = "0 0 100px 50px rgba(255, 255, 255, 0.4)";
const times = { // timing (t=0 when human gives input)
    human: {
        showToolDelay: 0
    },
    computer: {
        showToolDelay: 0.5 * 1000
    },
    showToolWinner: 0.8 * 1000,
    updateStars: 1 * 1000, // how long before winning star is shown
    hideToolDelay: 2 * 1000, // how long before player can input again
    gameRestartTime: 5 * 1000
}

// Setup
makeCallbackFunctions();
setAcceptInputs(true);

function playRound(playerSelection) {
    setAcceptInputs(false);
    const computerSelection = getComputerChoice();
    const winner = getWinnerOfRound(playerSelection, computerSelection);
    if (winner !== "tie") {
        ++playerScores[winner];
        setTimeout(() => {showScore(playerScores[winner], winner)}, times.updateStars);
    }
    showMove(playerSelection, computerSelection, winner);

    if (!isGameOver()) {
        setTimeout(() => {setAcceptInputs(true)}, times.hideToolDelay);
    }
    else {
        handleGameOver();
    }
}

function handleGameOver() {
    const winPlayer = playerScores.human > playerScores.computer ? "human" : "computer";
    const winPlayerVis = document.querySelector(`.player.${winPlayer} .profile-container`);
    const defaultPlayerShadow = winPlayerVis.style.boxShadow;
    
    setTimeout(() => {winPlayerVis.style.boxShadow = winPlayerShadow;}, times.updateStars);
    setTimeout(() => {
        winPlayerVis.style.boxShadow = defaultPlayerShadow;
        playerScores.human = 0;
        playerScores.computer = 0;
        showScore(playerScores.human, "human");
        showScore(playerScores.computer, "computer");
        setAcceptInputs(true);
    }, times.gameRestartTime);
}

function isGameOver() {
    return Math.max(playerScores.human, playerScores.computer) === winScore;
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

function setAcceptInputs(state) {
    for (let i = 0; i < numTools; i++) {
        let target = document.querySelector(`.tools-container > .tool-container.${tools[i]}`);
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
            star.src = "./imgs/starFilled.svg";
        }
        else {
            star.src = "./imgs/starEmpty.svg";
        }
    }
}

function showMove(humanTool, computerTool, winner) {
    const players = ["human", "computer"];
    const tools = {
        human: humanTool,
        computer: computerTool
    }

    for (const player of players) {
        // Choose correct tool
        let currentMoveImg = document.querySelector(`.player.${player} .choice > img`);
        currentMoveImg.src = toolImgs[tools[player]];

        // Show
        let currentMove = document.querySelector(`.player.${player} .choice`);
        let defaultShadow = currentMove.style.boxShadow;
        setTimeout(() => {currentMove.style.visibility = "visible";}, times[player].showToolDelay);

        // Hide again
        setTimeout(() => {currentMove.style.visibility = "hidden";}, times.hideToolDelay);

        // Show and hide victory shadow
        if (player === winner) {
            setTimeout(() => {currentMove.style.boxShadow = winToolShadow;}, times.showToolWinner);
            setTimeout(() => {currentMove.style.boxShadow = defaultShadow;}, times.hideToolDelay);
        }
    }
}
