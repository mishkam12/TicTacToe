const gameData = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
];

let editedPlayer = 0;
let gameMode = "";
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
    {
        name: "",
        symbol: "X"
    },
    {
        name: "",
        symbol: "O"
    }
];

const playerConfigOverlayElement = document.getElementById("config-overlay");
const formElement = document.querySelector("form");
const errorsOutputElement = document.getElementById("config-errors");

const onePlayer = document.getElementById("one-player");
const twoPlayers = document.getElementById("two-players");

const gameAreaElement = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");

const edit2PlayerPlayer1BtnElement = document.getElementById("edit-player-1-2p-btn");
const edit2PlayerPlayer2BtnElement = document.getElementById("edit-player-2-2p-btn");
const edit1PlayerPlayer1BtnElement = document.getElementById("edit-player-1-1p-btn");
const cancelConfigBtnElement = document.getElementById("cancel-config-btn");
const onePlayerGameBtnElement = document.getElementById("one-player-btn"); 
const twoPlayerGameBtnElement = document.getElementById("two-player-btn"); 
const startNewGameBtnElement = document.getElementById("start-game-btn");
const startNewGameVsComputerBtnElement = document.getElementById("start-game-vs-computer-btn");
//const gameFieldElements = document.querySelectorAll("#game-board li");

const gameBoardElement = document.getElementById("game-board");

edit2PlayerPlayer1BtnElement.addEventListener ("click", openPlayerConfig);
edit2PlayerPlayer2BtnElement.addEventListener ("click", openPlayerConfig);
edit1PlayerPlayer1BtnElement.addEventListener ("click", openPlayerConfig);

cancelConfigBtnElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

onePlayerGameBtnElement.addEventListener("click", event => {
    event.preventDefault();
    onePlayer.style.display = "block";
    twoPlayers.style.display = "none";
    playerConfigOverlayElement.style.display = "none";
});

twoPlayerGameBtnElement.addEventListener("click", event => {
     event.preventDefault();
     twoPlayers.style.display = "block";
     onePlayer.style.display = "none";
     playerConfigOverlayElement.style.display = "none";
    });
  
startNewGameBtnElement.addEventListener("click", startTwoPlayerNewGame);
startNewGameVsComputerBtnElement.addEventListener("click", startOnePlayerNewGame);

gameBoardElement.addEventListener("click", selectGameField);