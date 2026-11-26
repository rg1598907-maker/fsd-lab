
let playerPosition = 1;

let snakes = {
    99: 54,
    70: 55,
    52: 42,
    25: 2
};

let ladders = {
    6: 25,
    11: 40,
    60: 85,
    46: 90
};

let board = document.getElementById("board");

// Create 100 cells
for (let i = 100; i >= 1; i--) {

    let cell = document.createElement("div");

    cell.className = "cell";
    cell.id = "cell" + i;
    cell.innerText = i;

    board.appendChild(cell);
}

// Display player position
function updatePlayer() {

    // Remove old player
    document.querySelectorAll(".player").forEach(p => p.remove());

    let player = document.createElement("div");
    player.className = "player";

    document.getElementById("cell" + playerPosition)
        .appendChild(player);
}

// Roll dice function
function rollDice() {

    let dice = Math.floor(Math.random() * 6) + 1;

    document.getElementById("dice").innerText = dice;

    let newPosition = playerPosition + dice;

    if (newPosition > 100) {
        document.getElementById("message").innerText =
            "You need exact number to reach 100!";
        return;
    }

    playerPosition = newPosition;

    // Check ladder
    if (ladders[playerPosition]) {
        playerPosition = ladders[playerPosition];

        document.getElementById("message").innerText =
            "Great! You climbed a ladder!";
    }

    // Check snake
    else if (snakes[playerPosition]) {
        playerPosition = snakes[playerPosition];

        document.getElementById("message").innerText =
            "Oops! A snake brought you down!";
    }

    else {
        document.getElementById("message").innerText =
            "You moved to position " + playerPosition;
    }

    updatePlayer();

    // Check winner
    if (playerPosition === 100) {
        document.getElementById("message").innerText =
            "Congratulations! You Won!";
    }
}

// Initial player position
updatePlayer();