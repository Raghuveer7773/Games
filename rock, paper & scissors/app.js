// app.js (replace old file)
let userScore = 0;
let compScore = 0;
let acceptingInput = true; // block input while round animating

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetScoresBtn = document.querySelector("#reset-scores-btn");

const options = ["rock", "paper", "scissors"];

const genCompChoice = () => {
  return options[Math.floor(Math.random() * options.length)];
};

const updateScoreUI = () => {
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
};

const setMsg = (text, color = "#081b31") => {
  msg.innerText = text;
  msg.style.backgroundColor = color;
};

// determine winner: returns 'win' if user wins, 'lose' if user loses, 'draw' otherwise
const decideResult = (userChoice, compChoice) => {
  if (userChoice === compChoice) return "draw";
  if (userChoice === "rock") return compChoice === "scissors" ? "win" : "lose";
  if (userChoice === "paper") return compChoice === "rock" ? "win" : "lose";
  if (userChoice === "scissors") return compChoice === "paper" ? "win" : "lose";
};

// add classes to show result glow, then remove after timeout
const highlightChoices = (userEl, compEl, result) => {
  // ensure selected shown
  userEl.classList.add("selected");
  compEl.classList.add("selected");

  if (result === "win") {
    userEl.classList.add("win");
    compEl.classList.add("lose");
  } else if (result === "lose") {
    userEl.classList.add("lose");
    compEl.classList.add("win");
  } else {
    userEl.classList.add("draw");
    compEl.classList.add("draw");
  }

  // clear classes after 900ms (animation length)
  setTimeout(() => {
    [userEl, compEl].forEach(el => {
      el.classList.remove("selected", "win", "lose", "draw");
    });
    acceptingInput = true; // allow next round
  }, 900);
};

// main play function
const playGame = (userChoice, userEl) => {
  if (!acceptingInput) return;
  acceptingInput = false;

  // immediate feedback for user click
  userEl.classList.add("selected");
  setMsg("Computer is choosing...", "#444");

  // small delay to make it feel interactive
  setTimeout(() => {
    const compChoice = genCompChoice();
    const compEl = document.getElementById(compChoice);

    const result = decideResult(userChoice, compChoice);

    if (result === "win") {
      userScore++;
      setMsg(`You win! ${userChoice} beats ${compChoice}`, "green");
    } else if (result === "lose") {
      compScore++;
      setMsg(`You lost. ${compChoice} beats ${userChoice}`, "red");
    } else {
      setMsg(`It's a draw: ${userChoice} = ${compChoice}`, "#0b66ff");
    }

    updateScoreUI();
    highlightChoices(userEl, compEl, result);
  }, 450); // 450ms delay
};

// attach listeners
choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.id; // "rock" / "paper" / "scissors"
    playGame(userChoice, choice);
  });
});

// reset scores handler
resetScoresBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  updateScoreUI();
  setMsg("Scores reset. Play again!", "#081b31");
});

// init UI
updateScoreUI();
setMsg("Play your move", "#081b31");
