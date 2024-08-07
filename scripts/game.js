function resetGame () {
    activePlayer = 0;
    currentRound = 1;
    gameIsOver =false;
    gameOverElement.firstElementChild.innerHTML = 
    'You won, <span id="winner-name">PLAYER NAME</span>! Congratulations!!';
    gameOverElement.style.display = "none";

    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData [i][j] = 0;
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
            gameBoardItemElement.textContent ="";
            gameBoardItemElement.classList.remove ("disabled");
            gameBoardIndex++;
        }
    }
}

function startNewGame () {
    if (players[0].name === "" || players[1].name === "") { // if either two players do NOT have a name
        alert("Please make sure to add player names") // this message will show if player names have not been entered
        return; //when this is executed code after is NOT executed
    }

    resetGame();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = "block";
}

function switchPlayer () {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField (event) { // this is done to keep track of which field the player is clicking on so that we can make sure they are not clicking on the same field and see who wins
    if (event.target.tagName !=="LI" || gameIsOver) {
    return;
}

    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if (gameData[selectedRow][selectedColumn]> 0) {
        alert ("Please click on an empty field!");
        return;
    }

    selectedField.textContent = players[activePlayer].symbol; // first round will access player[0]
    selectedField.classList.add("disabled");

    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    
    const winnerId = checkForGameOver();

    if (winnerId !== 0) {
        endGame(winnerId);
    }

    currentRound ++;
    switchPlayer();
}

function checkForGameOver () {
   // this for loop checks if the rows are equal (aka if selected by the same player they win)
    for (let i = 0; i < 3; i++) {
        if (
            gameData [i][0] > 0 && 
            gameData [i][0] === gameData [i][1] && 
            gameData [i][1] === gameData [i][2]
            ) {
            return gameData [i][0];
        }
    }
    // this for loop checks if the columns are equal (aka if selected by the same player they win)
    for (let i = 0; i < 3; i++) {
        if (
            gameData [0][i] > 0 && 
            gameData [0][i] === gameData [1][i] && 
            gameData [0][i] === gameData [2][i]
            ) {
            return gameData [0][i];
        }
    }

    if (
        gameData [0][0] > 0 && 
        gameData [0][0] === gameData [1][1] && 
        gameData [1][1] === gameData [2][2]
        ) {
        return gameData [0][0];
    }

    if (
        gameData [2][0] > 0 && 
        gameData [2][0] === gameData [1][1] && 
        gameData [1][1] === gameData [0][2]
        ) {
        return gameData [2][0];
    }
    if (currentRound ===9) {
        return -1;
    }
    return 0;
}

function endGame(winnerId) {
    gameIsOver = true;
    gameOverElement.style.display = "block";

    if (winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
        winnerName;
    } else {
        gameOverElement.firstElementChild.textContent = "It's a draw!!";
    } 

}
