/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");

// console.log(squareEls);
// console.log(messageEl);

/*-------------------------------- Functions --------------------------------*/
// Rendering the game state
function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  //console.log("Game On")

  render();
}

//Call function when app loads
init();

//Create Render function
function render() {
  updateBoard();
  updateMessage();
}

//Create Update Board function
function updateBoard() {
  board.forEach((value, index) => {
    const squareElement = squareEls[index];
    squareElement.textContent = value;
  });
}

//Create Update message function
function updateMessage() {
  if (winner) {
    messageEl.textContent = `${turn} has won!`;
  } else if (tie) {
    messageEl.textContent = "It's a tie.";
  } else {
    messageEl.textContent = `It is ${turn}'s turn.`;
  }
}

//Step 6
const handleClick = (event) => {
  const squareIndex = Number(event.target.id);
  if (
    board[squareIndex] === "X" ||
    board[squareIndex] === "O" ||
    winner === true
  ) {
    return;
  }

  placePiece(squareIndex);
  checkWinner();
  checkForTie();
  switchPlayerTurn();
  render();
};

//Step 6.1
function placePiece(index) {
  board[index] = turn;
}

//Step 6.2
function checkWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      break;
    }
  }
}

//Step 6.3
function checkForTie() {
  if (winner === true) {
    return;
  } else if (board.includes("")) {
    tie = false;
  } else {
    tie = true;
  }
}
//console.log(tie);

//Step 6.4
function switchPlayerTurn() {
  if (winner === true) {
    return;
  } else if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }
}
//console.log(turn)
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((squareElement) => {
  squareElement.addEventListener("click", handleClick);
});

resetBtnEl.addEventListener("click", init);
