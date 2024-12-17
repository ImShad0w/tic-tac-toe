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



function playRound() {
  const symbol = readline.question("What symbol you want to play with? X or O").toUpperCase(); //Asks the symbol to use
  if (symbol != "X" && symbol != "O") {
    console.log("Invalid symbol, pick one of the two allowed symbols.");
    return playRound(); //Plays the function again if no symbol or if symbol doesn't meet reqs
  }
  const player1 = Player(symbol); //Assigns player1 to symbol
  while (player1.getPoints() != 3) {
    const row = parseInt(readline.question("Choose the row from 1 - 3: ")) - 1;
    const column = parseInt(readline.question("Choose the column from 1 - 3: ")) - 1;
    if (Gameboard.makeMove(row, column, player1.symbol)) {
      Gameboard.display();
      if (Gameboard.checkWinner(player1.symbol)) {
        player1.addPoints();
        console.log("Player has won this round!")
        Gameboard.reset();
      }
    }
    else {
      console.log("This move either has already been played, or is invalid")
    }
  }
  if (player1.getPoints() === 3) {
    console.log(`${player1.symbol} won the game!!!!`);
  }
};

playRound();





