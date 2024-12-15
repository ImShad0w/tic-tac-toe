//TODO
//Create gameboard iife
//Create player factory
//Add logic to check if a player won
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const Gameboard = (function () {
  const gameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  return {
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
  rl.question("Input the symbol you want to play with X or O: ", (symbol) => {
    const player1 = Player(symbol);
    Gameboard.display();
    while (player1.getPoints != 3) {
      rl.question("Input the row from 1 to 3:  ", (row) => {
        rl.question("Input the column from 1 to 3: ", (column) => {
          Gameboard.makeMove(row, column)
        })
      })
    }
  });
}

playRound();





