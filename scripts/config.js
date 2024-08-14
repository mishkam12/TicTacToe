function openPlayerConfig(event) {
    editedPlayer = +event.target.dataset.playerid; 
    gameMode = event.target.closest('[data-gamemode]').dataset.gamemode;
    playerConfigOverlayElement.style.display = "block";
}

function closePlayerConfig() {
    playerConfigOverlayElement.style.display = "none";
    formElement.firstElementChild.classList.remove("error");
    errorsOutputElement.textContent ="";
    formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get("playername").trim();// trim function trims extra whitespace before and after content

    if (!enteredPlayerName) { 
        event.target.firstElementChild.classList.add("error");
        errorsOutputElement.textContent = "Please enter a valid name."
        return;
    }

    const updatedPlayerDataElement = document.getElementById(
        editedPlayer === 1  ? (gameMode === "single" ? "player-1-1p-data" : "player-1-2p-data") : "player-2-2p-data");

    updatedPlayerDataElement.children[1].textContent = enteredPlayerName;
    players[editedPlayer - 1].name = enteredPlayerName;

    closePlayerConfig();

}