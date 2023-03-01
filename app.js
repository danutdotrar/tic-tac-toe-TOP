const row = document.querySelector("#row");

// Store the gameboard as an array inside the Gameboard object
// Use a module with IIFE to create a single gameboard
const Gameboard = (() => {
    const table = ["", "", "", "", "", "", "", "", ""];

    const createTable = () => {
        for (let i = 0; i < table.length; i++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.innerHTML = table[i];
            row.appendChild(cell);
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

// Select cell
// Use event delegation - add event listener to the parent element
row.addEventListener("click", (e) => {
    // If the target element is the div that we need, execute
    if (e.target.matches(".cell")) {
        // Use closest to select the closest ancestor with the class 'cell', which will be the current clicked element
        const cell = e.target.closest(".cell");
        console.log(cell);
        cell.innerHTML = "X";
    }
});

// Create table
Gameboard.createTable();
