let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;
let isPlayingSequence = false;

const btns = ["red", "yellow", "green", "purple"];
let baseSpeed = 600;
let speed = baseSpeed;

let strictMode = false;

//  get element
const levelDisplay = document.getElementById("level");
const highScoreDisplay = document.getElementById("highScore");
const status = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const difficultySelect = document.getElementById("difficulty");

// init
let highScore = localStorage.getItem("simonsayHighScore") || 0;
highScoreDisplay.innerText = highScore;

// event listener

// Start
startBtn.addEventListener("click", startGame);

// Restart
restartBtn.addEventListener("click", restartGame);

// Difficulty
difficultySelect.addEventListener("change", () => {
  baseSpeed = Number(difficultySelect.value);
  speed = baseSpeed;
});

// Strict Mode
document.getElementById("strictMode").addEventListener("change", (e) => {
  strictMode = e.target.checked;
});

// Button Clicks
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", handleUserClick);
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
  const keyMap = {
    r: "red",
    y: "yellow",
    g: "green",
    p: "purple"
  };

  if (keyMap[e.key] && started && !isPlayingSequence) {
    document.getElementById(keyMap[e.key]).click();
  }
});

// game

function startGame() {
  if (started) return;

  started = true;
  level = 0;
  gameSeq = [];
  speed = baseSpeed;

  status.innerText = "Game Started!";
  nextLevel();
}

function restartGame() {
  reset();
  status.innerText = "Game Restarted! Click Start";
}

function nextLevel() {
  userSeq = [];
  level++;

  levelDisplay.innerText = level;
  status.innerText = "Watch carefully...";
  status.classList.remove("active-turn");

  // Increase difficulty gradually
  if (speed > 250) speed -= 10;

  // Add random color
  const randColor = btns[Math.floor(Math.random() * btns.length)];
  gameSeq.push(randColor);

  playSequence();
}

function playSequence() {
  isPlayingSequence = true;
  let i = 0;

  const interval = setInterval(() => {
    const btn = document.getElementById(gameSeq[i]);
    flash(btn, "flash");

    i++;

    if (i >= gameSeq.length) {
      clearInterval(interval);
      isPlayingSequence = false;

      status.innerText = "Your turn!";
      status.classList.add("active-turn");
    }
  }, speed);
}

// user input

function handleUserClick() {
  if (!started || isPlayingSequence) return;

  const color = this.id;
  userSeq.push(color);

  flash(this, "userFlash");
  checkAnswer(userSeq.length - 1);
}

function checkAnswer(index) {
  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(nextLevel, 800);
    }
  } else {
    gameOver();
  }
}

// effects

function flash(btn, className) {
  playSound(btn.id);
  btn.classList.add(className);
  setTimeout(() => btn.classList.remove(className), 250);
}

function playSound(color) {
  const sound = document.getElementById(color + "Sound");
  if (sound) {
    sound.currentTime = 0; 
    sound.play();
  }
}

// game over

function gameOver() {
  document.getElementById("wrongSound").play();

  document.body.classList.add("shake");

  status.innerHTML = `❌ Game Over! Score: <b>${level}</b>`;

  updateHighScore();

  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 400);

  if (strictMode) {
    reset();
  }
}

// high score

function updateHighScore() {
  if (level > highScore) {
    highScore = level;
    localStorage.setItem("simonsayHighScore", highScore);
    highScoreDisplay.innerText = highScore;
  }
}

function reset() {
  level = 0;
  gameSeq = [];
  userSeq = [];
  started = false;
  isPlayingSequence = false;
  speed = baseSpeed;

  levelDisplay.innerText = 0;
}