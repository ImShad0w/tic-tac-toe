//TODO
//Create gameboard iife
//Create player factory
//Add logic to check if a player won
const readline = require("readline-sync");

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
        if (board[i].every(cell => cell === playerSymbol)) {
          currentPlayer.addPoints();
        }
        //Checks columns
        if (board[0][i] === playerSymbol && board[1][i] === playerSymbol && board[2][i] === playerSymbol) {
          currentPlayer.addPoints();
        }
        if (board[0][0] === playerSymbol && board[1][1] === playerSymbol && board[2][2] === playerSymbol) {
          currentPlayer.addPoints();
        } // Diagonal 1
        if (board[0][2] === playerSymbol && board[1][1] === playerSymbol && board[2][0] === playerSymbol) {
          currentPlayer.addPoints();
        }; // Diagonal 2
      }
    },
    getBoard: function () {
      return gameboard;
    },
    makeMove: function (row, col, player) {
      if (gameboard[row][col] === null) {
        gameboard[row][col] = player;
        return true;
      }
      return false;
    },
    reset: function () {
      for (i = 0; i < gameboard.length; i++) {
        for (y = 0; y < gameboard[i].length; y++) {
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



function playRound() {
  const symbol = readline.question("What symbol you want to play with? X or O").toUpperCase();
  if (symbol != "X" && symbol != "O") {
    console.log("Invalid symbol, pick one of the two allowed symbols.");
    return playRound();
  }
  const player1 = Player(symbol);
  while (player1.getPoints != 1) {
    const row = parseInt(readline.question("Choose the row from 1 - 3")) - 1;
    const column = parseInt(readline.question("Choose the column from 1 -3")) - 1;
    if (Gameboard.makeMove(row, column, player1.symbol)) {
      Gameboard.display();
    }
    else {
      console.log("Invalid move");
    }
  }
};

playRound();





