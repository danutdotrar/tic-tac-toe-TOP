const row = document.querySelector("#row");
const cells = document.querySelectorAll(".cell");

// Store the gameboard as an array inside the Gameboard object
// Use a module with IIFE to create a single gameboard
const Gameboard = (() => {
    const table = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    const createTable = () => {
        // Iterate through the nested array
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table.length; j++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.innerHTML = table[i][j];
                row.appendChild(cell);
            }
        }
    };

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

                if (currentPlayer == player1 && cellClicked.innerHTML == "") {
                    cellClicked.innerHTML = player1.mark;

                    // Switch player
                    currentPlayer = player2;
                } else if (
                    currentPlayer == player2 &&
                    cellClicked.innerHTML == ""
                ) {
                    cellClicked.innerHTML = player2.mark;

                    // Switch player
                    currentPlayer = player1;
                }
            }
        });
    };

    return { createTable, selectCell };
})();

// Player Factory Object
const PlayerFactory = (name, mark) => {
    return { name, mark };
};

// Players
const player1 = PlayerFactory("Player 1", "X");
const player2 = PlayerFactory("Player 2", "O");

// Create table
Gameboard.createTable();
Gameboard.selectCell();
