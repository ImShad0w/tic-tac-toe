let player1;
let aiPlayer;
let gameOver = false;

window.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");

  // Display the modal when the DOM is loaded
  modal.style.display = "block";

  const buttons = modal.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      player1 = Player(button.textContent);
      aiPlayer = computerPlayer(player1.symbol === "X" ? "O" : "X");
      modal.style.display = "none";
      const playerSymbol = document.querySelector(".playerSymbol")
      const computerSymbol = document.querySelector(".computerSymbol")
      // Start the game after the modal is closed
      playerSymbol.textContent = player1.symbol;
      computerSymbol.textContent = aiPlayer.symbol;
      startGame();
    });
  });
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
        if (gameboard[i].every(cell => cell === playerSymbol)) return true;
        if (gameboard[0][i] === playerSymbol && gameboard[1][i] === playerSymbol && gameboard[2][i] === playerSymbol) return true;
      }
      if (gameboard[0][0] === playerSymbol && gameboard[1][1] === playerSymbol && gameboard[2][2] === playerSymbol) return true;
      if (gameboard[0][2] === playerSymbol && gameboard[1][1] === playerSymbol && gameboard[2][0] === playerSymbol) return true;
      return false;
    },
    makeMove: function (row, col, player) {
      if (gameboard[row][col] === null) {
        gameboard[row][col] = player;
        return true;
      }
      return false;
    },
    reset: function () {
      for (let i = 0; i < gameboard.length; i++) {
        for (let j = 0; j < gameboard[i].length; j++) {
          gameboard[i][j] = null;
        }
      }
    },

    isFull: function () {
      return gameboard.every(row => row.every(cell => cell !== null))
    }
  };
})();

function Player(symbol) {
  let points = 0;
  const getPoints = () => points;
  const addPoints = () => points++;
  const resetPoints = () => points = 0;
  return { symbol, getPoints, addPoints, resetPoints };
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
    const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (square) {
      square.textContent = symbol;
    }
  };
  return { symbol, getMove, getPoints, addPoints, resetPoints };
}
const highlight = document.querySelector(".highlight")
function startGame() {
  const squares = document.querySelectorAll(".gameboard-square");
  gameOver = false;
  player1.resetPoints();
  aiPlayer.resetPoints();

  squares.forEach(square => {
    square.addEventListener("click", handlePlayerMove);
  });
}

function handlePlayerMove(event) {
  if (gameOver) return;

  const square = event.target;
  const row = square.dataset.row;
  const col = square.dataset.col;


  //Check if the move is valid
  if (Gameboard.makeMove(row, col, player1.symbol)) {
    highlight.textContent = "Make a move!"
    square.textContent = player1.symbol;
    displayPoints();
  }
  else {
    highlight.textContent = "Invalid move, try again!"
    return;
  }

  //Updates content of the square


  if (Gameboard.checkWinner(player1.symbol)) {
    player1.addPoints();
    displayPoints();
    resetRound();
    highlight.textContent = "Player has won this round!"
    return;
  }

  if (Gameboard.isFull() && !Gameboard.checkWinner(player1.symbol)) {
    highlight.textContent = "It's a draw!";
    resetRound();
    return;
  }

  aiPlayer.getMove();

  if (Gameboard.checkWinner(aiPlayer.symbol)) {
    aiPlayer.addPoints();
    displayPoints();
    resetRound();
    highlight.textContent = "Computer has won this round!"
    return;
  }

  if (Gameboard.isFull() && !Gameboard.checkWinner(aiPlayer.symbol)) {
    highlight.textContent = "It's a draw!";
    resetRound();
    return;
  }

  if (player1.getPoints() === 3) {
    gameOver = true;
    highlight.textContent = "Player has won the game!"
    playAgain();
  } else if (aiPlayer.getPoints() === 3) {
    gameOver = true;
    playAgain();
    highlight.textContent = "Computer has won the game!"
  }
}

function resetRound() {
  Gameboard.reset();
  resetGameboard();
}

function resetGameboard() {
  const squares = document.querySelectorAll(".gameboard-square");
  squares.forEach(square => {
    square.textContent = "";
  });
}

function displayPoints() {
  const playerPoints = document.querySelector(".playerPoints")
  const computerPoints = document.querySelector(".computerPoints")
  playerPoints.textContent = `Player points: ${player1.getPoints()}`
  computerPoints.textContent = `Computer points: ${aiPlayer.getPoints()}`
}

function playAgain() {
  if (gameOver) {
    let answer = prompt("Want to play again?").toUpperCase().trim();
    if (answer === "YES") {
      location.reload();
    }
    else {
      alert("The game has ended refresh to play again!");
    }
  }
}
