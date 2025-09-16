// app.js (replace your current file with this)

const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-game-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const scoreXEl = document.querySelector("#score-x");
const scoreOEl = document.querySelector("#score-o");
const turnEl = document.querySelector("#turn");

let turnO = true;           // true = O's turn, false = X's turn
let scoreX = 0;
let scoreO = 0;
let gameOver = false;

// If you want single-player vs computer, set this true.
// Computer will play "X" (simple random move).
const SINGLE_PLAYER = false;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

const updateScoreDisplay = () => {
  scoreXEl.innerText = scoreX;
  scoreOEl.innerText = scoreO;
};

const updateTurnIndicator = () => {
  turnEl.innerText = `Turn: ${turnO ? "O" : "X"}`;
};

const showMessage = (text) => {
  msg.innerText = text;
  msgContainer.classList.remove("hide");
};

const clearBoxesStyles = () => {
  boxes.forEach(b => {
    b.style.backgroundColor = "#ffffc7";
    b.classList.remove("winning");
  });
};

const resetBoard = () => {
  gameOver = false;
  turnO = true;
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#ffffc7";
    box.classList.remove("winning");
  });
  msgContainer.classList.add("hide");
  updateTurnIndicator();
};

const resetAll = () => {
  resetBoard();
  scoreX = 0;
  scoreO = 0;
  updateScoreDisplay();
};

// returns true if game ended (win or draw)
const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (boxes[a].innerText &&
        boxes[a].innerText === boxes[b].innerText &&
        boxes[b].innerText === boxes[c].innerText) {
      // highlight winners
      boxes[a].classList.add("winning");
      boxes[b].classList.add("winning");
      boxes[c].classList.add("winning");
      boxes[a].style.backgroundColor = boxes[b].style.backgroundColor = boxes[c].style.backgroundColor = "#90ee90";

      const winner = boxes[a].innerText;
      if (winner === "X") scoreX++;
      else scoreO++;

      updateScoreDisplay();
      showMessage(`🎉 Winner is ${winner}`);
      boxes.forEach(box => box.disabled = true);
      gameOver = true;
      return true;
    }
  }

  // draw check
  if ([...boxes].every(box => box.innerText)) {
    showMessage("🤝 It's a Draw!");
    gameOver = true;
    return true;
  }

  return false;
};

const handleBoxClick = (e) => {
  const box = e.target;
  if (box.innerText || gameOver) return;

  box.innerText = turnO ? "O" : "X";
  box.disabled = true;

  const ended = checkWinner();
  if (!ended) {
    turnO = !turnO;
    updateTurnIndicator();

    // single-player: if it's now X's turn (computer) and SINGLE_PLAYER true -> move
    if (SINGLE_PLAYER && !turnO && !gameOver) {
      setTimeout(computerMove, 300);
    }
  }
};

// simple random computer move (plays 'X')
const computerMove = () => {
  if (gameOver) return;
  const empty = [...boxes].filter(b => !b.innerText);
  if (empty.length === 0) return;
  const choice = empty[Math.floor(Math.random() * empty.length)];
  choice.innerText = "X";
  choice.disabled = true;

  const ended = checkWinner();
  if (!ended) {
    turnO = true;
    updateTurnIndicator();
  }
};

// event listeners
boxes.forEach(box => box.addEventListener("click", handleBoxClick));
newGameBtn.addEventListener("click", resetBoard);
resetBtn.addEventListener("click", resetAll);

// init
updateScoreDisplay();
updateTurnIndicator();





