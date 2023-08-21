const playerOptions = document.querySelectorAll('.option');
const playerNameInput = document.getElementById('playerName');
const playerScoreDisplay = document.getElementById('playerScore');
const pcScoreDisplay = document.getElementById('pcScore');
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('resetButton');

let playerScore = 0;
let pcScore = 0;

playerOptions.forEach(option => {
    option.addEventListener('click', () => {
        const playerChoice = option.id;
        const pcChoice = getRandomChoice();
        const winner = getRoundWinner(playerChoice, pcChoice);
        updateScore(winner);
        displayResult(playerChoice, pcChoice, winner);
        checkForGameEnd();
    });
});

resetButton.addEventListener('click', () => {
    resetGame();
});

function getRandomChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getRoundWinner(playerChoice, pcChoice) {
    if (playerChoice === pcChoice) {
        return 'tie';
    } else if (
        (playerChoice === 'rock' && pcChoice === 'scissors') ||
        (playerChoice === 'paper' && pcChoice === 'rock') ||
        (playerChoice === 'scissors' && pcChoice === 'paper')
    ) {
        return 'player';
    } else {
        return 'pc';
    }
}

function updateScore(winner) {
    if (winner === 'player') {
        playerScore++;
    } else if (winner === 'pc') {
        pcScore++;
    }
    playerScoreDisplay.textContent = playerScore;
    pcScoreDisplay.textContent = pcScore;
}

function displayResult(playerChoice, pcChoice, winner) {
    const resultString = `${playerNameInput.value} eligió ${playerChoice}. La PC eligió ${pcChoice}. `;
    if (winner === 'player') {
        resultDisplay.textContent = resultString + '¡Ganaste esta ronda!';
    } else if (winner === 'pc') {
        resultDisplay.textContent = resultString + 'La PC ganó esta ronda.';
    } else {
        resultDisplay.textContent = resultString + 'Empate.';
    }
}

function checkForGameEnd() {
    if (playerScore === 3) {
        resultDisplay.textContent = `${playerNameInput.value} gana el juego.`;
        disableOptions();
    } else if (pcScore === 3) {
        resultDisplay.textContent = 'La PC gana el juego.';
        disableOptions();
    }
}

function resetGame() {
    playerScore = 0;
    pcScore = 0;
    playerScoreDisplay.textContent = '0';
    pcScoreDisplay.textContent = '0';
    resultDisplay.textContent = '';
    enableOptions();
}

function disableOptions() {
    playerOptions.forEach(option => {
        option.removeEventListener('click', () => {});
    });
}

function enableOptions() {
    playerOptions.forEach(option => {
        option.addEventListener('click', () => {});
    });
}