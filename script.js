let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-btn');
const winnerMessage = document.getElementById('winner-message');

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinningCells(pattern);
      gameOver = true;
      winnerMessage.textContent = `${currentPlayer} wins!`;
      return;
    }
  }
  if (board.every(cell => cell !== '')) {
    gameOver = true;
    winnerMessage.textContent = "It's a tie!";
  }
}

function highlightWinningCells(pattern) {
  pattern.forEach(index => {
    cells[index].classList.add('winning-cell');
  });
}

function handleClick(event) {
  const cellIndex = event.target.getAttribute('data-index');
  
  if (board[cellIndex] || gameOver) return;

  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  checkWinner();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  winnerMessage.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning-cell');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
