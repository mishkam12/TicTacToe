function resetGame() {
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML = 
    'You won, <span id="winner-name">PLAYER NAME</span>! Congratulations!!';
    gameOverElement.style.display = "none";

    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
            gameBoardItemElement.textContent ="";
            gameBoardItemElement.classList.remove("disabled");
            gameBoardIndex++;
        } 
    }
}

function startOnePlayerNewGame() {
    if (players[0].name === "") { 
        alert("Please make sure to add player name"); 
        return; 
    }

    //Set symbol and name for computer
    players[1].name = "Computer"; 
    players[1].symbol = "O";

    resetGame();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = "block";
}

function startTwoPlayerNewGame() {
    if (players[0].name === "" || players[1].name === "") { 
        alert("Please make sure to add player names"); 
        return; 
    }

    resetGame();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = "block";
}

function switchPlayer() {
    activePlayer = (activePlayer === 0) ? 1: 0;
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField (event) { 
    if (event.target.tagName !=="LI" || gameIsOver) {
    return;
}

    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert ("Please click on an empty field!");
        return;
    }

    selectedField.textContent = players[activePlayer].symbol; // first round will access player[0]
    selectedField.classList.add("disabled");

    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    
    const winnerId = checkForGameOver();

    if (winnerId !== 0) {
        endGame(winnerId);
        return;
    }

    currentRound++;
    switchPlayer();

    if(players[activePlayer].name ==="Computer" && !gameIsOver){
        computerMove(); // computer will make a move when it is the computer's turn
    }
}

function computerMove() {
     let emptyFields = [];
     for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameData[i][j] === 0) {
                emptyFields.push({
                    row: i,
                    col: j
                });
            }
        } 
    }

    if (emptyFields.length === 0) return;

    //add a delay for computer moves
    setTimeout(() => {
    const computerRandomMove = emptyFields[Math.floor(Math.random() * emptyFields.length)];
    const selectedField = gameBoardElement.querySelector(`li[data-row="${computerRandomMove.row + 1}"][data-col="${computerRandomMove.col + 1}"]`);
    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add("disabled");

    gameData[computerRandomMove.row][computerRandomMove.col] = activePlayer + 1;
    
    const winnerId = checkForGameOver();

    if (winnerId !== 0) {
        endGame(winnerId);
        return;
    }

    currentRound++;
    switchPlayer();
}, 400)};

function checkForGameOver() {
   // Check rows
    for (let i = 0; i < 3; i++) {
        if (
            gameData [i][0] > 0 && 
            gameData [i][0] === gameData [i][1] && 
            gameData [i][1] === gameData [i][2]
            ) {
            return gameData [i][0];
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {0
        if (
            gameData [0][i] > 0 && 
            gameData [0][i] === gameData [1][i] && 
            gameData [0][i] === gameData [2][i]
            ) {
            return gameData [0][i];
        }
    }
    //Check diagonals
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
    //Check for draw
    if (currentRound === 9) {
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
