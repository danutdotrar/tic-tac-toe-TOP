const row = document.querySelector("#row");
const cells = document.querySelectorAll(".cell");

let table = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

// Store the gameboard as an array inside the Gameboard object
// Use a Module Pattern to create a single gameboard
const Gameboard = (() => {
    const createTable = () => {
        // Iterate through the nested array
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table.length; j++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.dataset.row = i; // set the row index
                cell.dataset.col = j; // set the column index
                cell.innerHTML = table[i][j];
                row.appendChild(cell);
            }
        }
    };

    return { createTable };
})();

// Player Factory Object
const PlayerFactory = (name, mark) => {
    return { name, mark };
};

// Players
const player1 = PlayerFactory("Player 1", "X");
const player2 = PlayerFactory("Player 2", "O");

// The game begins
const Game = (() => {
    // Select cell
    const selectCell = () => {
        // Set the initial player
        let currentPlayer = player1;
        // Use event delegation - add event listener to the parent element
        row.addEventListener("click", (e) => {
            // If the target element is the div that we need, execute
            if (e.target.matches(".cell")) {
                // Use closest to select the closest ancestor with the class 'cell', which will be the current clicked element
                const cellClicked = e.target.closest(".cell");

                // Get the row and column index from the dataset properties
                const rowIndex = parseInt(cellClicked.dataset.row);
                const colIndex = parseInt(cellClicked.dataset.col);

                // Update the table with the current player's mark
                if (
                    currentPlayer == player1 &&
                    table[rowIndex][colIndex] == ""
                ) {
                    table[rowIndex][colIndex] = player1.mark;
                    cellClicked.innerHTML = player1.mark;
                    // Switch player
                    currentPlayer = player2;
                } else if (
                    currentPlayer == player2 &&
                    table[rowIndex][colIndex] == ""
                ) {
                    table[rowIndex][colIndex] = player2.mark;
                    cellClicked.innerHTML = player2.mark;
                    // Switch player
                    currentPlayer = player1;
                }
                CheckWinner(table);
            }
        });
    };

    return { selectCell };
})();

// Check the winner
const CheckWinner = (board) => {
    let winner;
    // Check for all possible winning combinations
    for (let i = 0; i < 3; i++) {
        // Check horizontal rows X
        if (board[i][0] === "X" && board[i][1] === "X" && board[i][2] === "X") {
            winner = player1.name;
            break;
        }
        // Check vertical columns X
        if (board[0][i] === "X" && board[1][i] === "X" && board[2][i] == "X") {
            winner = player1.name;
            break;
        }

        // Check vertical columns O
        if (board[i][0] === "O" && board[i][1] === "O" && board[i][2] === "O") {
            winner = player2.name;
            break;
        }
        // Check vertical columns O
        if (board[0][i] === "O" && board[1][i] === "O" && board[2][i] == "O") {
            winner = player2.name;
            break;
        }
    }
    // Check diagonal lines X
    if (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") {
        winner = player1.name;
    }
    if (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X") {
        winner = player1.name;
    }

    // Check diagonal lines O
    if (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") {
        winner = player2.name;
    }
    if (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O") {
        winner = player2.name;
    }

    // Check if the game is a tie
    let isTie = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                isTie = false;
            }
        }
    }

    // Display winner or tie message
    if (winner) {
        console.log(`The winner is ${winner}!`);
        return winner;
    } else if (isTie) {
        console.log("It's a tie!");
        return "Tie";
    } else {
        return null;
    }
};

CheckWinner(table);

// Create table
Gameboard.createTable();
Game.selectCell();
