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

// Create table
Gameboard.createTable();
