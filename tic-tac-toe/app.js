let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true = O's turn, false = X's turn

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

// Function to reset the game
const resetGame = () => {
  turnO = true;
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#ffffc7"; // remove highlight
  });
  msgContainer.classList.add("hide");
};

// Show winner or draw
const showMessage = (text) => {
  msg.innerText = text;
  msgContainer.classList.remove("hide");
};

// Check winner or draw
const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      // highlight winning boxes
      boxes[a].style.backgroundColor = boxes[b].style.backgroundColor = boxes[c].style.backgroundColor = "#90ee90";
      showMessage(`🎉 Winner is ${boxes[a].innerText}`);
      boxes.forEach(box => box.disabled = true);
      return;
    }
  }

  // Check for draw
  if ([...boxes].every(box => box.innerText)) {
    showMessage("🤝 It's a Draw!");
  }
};

// Box click event
boxes.forEach(box => {
  box.addEventListener("click", () => {
    box.innerText = turnO ? "O" : "X";
    turnO = !turnO;
    box.disabled = true;
    checkWinner();
  });
});

// Button events
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
