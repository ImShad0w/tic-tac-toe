//TODO
//Create gameboard iife
//Create player factory
//Add logic to check if a player won

//const readline = require("readline-sync");

window.addEventListener("DOMContentLoaded", () => {
  let modal = document.getElementById("modal");
  // Display the modal when the DOM is loaded
  modal.style.display = "block";
  const buttons = modal.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.style.display = "none";
      const player1 = Player(button.textContent);
    })
  })
});

const Gameboard = (function () {
  const gameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  return {
    checkWinner: function (playerSymbol) {
      for (let i = 0; i < 3; i++) {
        //Check rows for win
        if (gameboard[i].every(cell => cell === playerSymbol)) return true;
        //Checks columns
        if (gameboard[0][i] === playerSymbol && gameboard[1][i] === playerSymbol && gameboard[2][i] === playerSymbol) return true;
        //Checks first diagonal
        if (gameboard[0][0] === playerSymbol && gameboard[1][1] === playerSymbol && gameboard[2][2] === playerSymbol) return true;
        //Checks second diagonal
        if (gameboard[0][2] === playerSymbol && gameboard[1][1] === playerSymbol && gameboard[2][0] === playerSymbol) return true;
      }
    },
    getBoard: function () {
      return gameboard;
    },
    makeMove: function (row, col, player) {
      if (gameboard[row][col] === null) { // if the cell is empty
        gameboard[row][col] = player;
        return true;
      }
      return false;
    },
    reset: function () {
      for (i = 0; i < gameboard.length; i++) { //Iteration through rows
        for (y = 0; y < gameboard[i].length; y++) { //Iteration through columns
          gameboard[i][y] = null;
        }
      }
    },
    display: function () {
      gameboard.forEach(row => {
        console.log(row.map(cell => cell || " ").join(" | "));
        console.log("---------");
      })
    }
  };
})();

function Player(symbol) {
  let points = 0;
  const getPoints = () => points;
  const addPoints = () => points++;
  const resetPoints = () => points = 0;
  return { symbol, getPoints, addPoints, resetPoints }
}

function computerPlayer(symbol) {
  let points = 0;
  const getPoints = () => points;
  const addPoints = () => points++;
  const resetPoints = () => points = 0;
  const getMove = () => {
    let row, col;
    do {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    } while (!Gameboard.makeMove(row, col, symbol));
    return { row, col };
  };
  return { symbol, getPoints, addPoints, resetPoints, getMove }
}

//const playRound = (function () {
//  const symbol = readline.question("What symbol you want to play with? X or O: ").toUpperCase();
//  if (symbol !== "X" && symbol !== "O") {
//    console.log("Invalid symbol, pick one of the two allowed symbols.");
//    return playRound(); // Retry for valid input
//  }
//
//  const player1 = Player(symbol);
//  const aiPlayer = computerPlayer(symbol === "X" ? "O" : "X");
//
//  while (player1.getPoints() < 3 && aiPlayer.getPoints() < 3) {
//    Gameboard.display();
//    let validMove = false;
//    while (!validMove) {
//      const row = parseInt(readline.question("Choose the row (1-3): ")) - 1;
//      const col = parseInt(readline.question("Choose the column (1-3): ")) - 1;
//      validMove = Gameboard.makeMove(row, col, player1.symbol);
//      if (!validMove) console.log("Invalid move. Try again.");
//    }
//
//    if (Gameboard.checkWinner(player1.symbol)) {
//      player1.addPoints();
//      console.log("Player has won this round!");
//      Gameboard.reset();
//      continue;
//    }
//
//    aiPlayer.getMove();
//
//    if (Gameboard.checkWinner(aiPlayer.symbol)) {
//      aiPlayer.addPoints();
//      console.log("Computer has won this round!");
//      Gameboard.reset();
//    }
//  }
//
//  Gameboard.display();
//  console.log(`${player1.getPoints() === 3 ? "Player" : "Computer"} wins the game!`);
//})();


const squares = document.querySelectorAll("gameboard-square");

squares.forEach((square) => {
  square.addEventListener("click", () => {
    if ()
  })
})
