function openPlayerConfig(event) {
    editedPlayer = +event.target.dataset.playerid; //+ switches '1' string, to 1 as a number
    playerConfigOverlayElement.style.display = "block";
    backdropElement.style.display = "block";
}

function closePlayerConfig () {
    playerConfigOverlayElement.style.display = "none";
    backdropElement.style.display="none";
    formElement.firstElementChild.classList.remove("error");
    errorsOutputElement.textContent ="";
    formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get("playername").trim();// trim function trims extra whitespace before and after content

    if (!enteredPlayerName) { // same as saying: enteredPlayername === ""
        event.target.firstElementChild.classList.add("error");
        errorsOutputElement.textContent = "Please enter a valid name."
        return;
    }

    const updatedPlayerDataElement = document.getElementById ("player-" + editedPlayer +"-data") 
    // the editPlayer is the number associated with the Player # to target that id
    updatedPlayerDataElement.children[1].textContent = enteredPlayerName;

    players[editedPlayer - 1].name = enteredPlayerName;

    closePlayerConfig();


}