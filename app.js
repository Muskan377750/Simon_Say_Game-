let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;

let btns = ["red", "yellow", "green", "purple"];

// UI Elements
let levelDisplay = document.getElementById("level");
let highScoreDisplay = document.getElementById("highScore");
let status = document.getElementById("status");
let startBtn = document.getElementById("startBtn");

// High Score
let highScore = localStorage.getItem("simonsayHighScore") || 0;
highScoreDisplay.innerText = highScore;

// START BUTTON
startBtn.addEventListener("click", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

// LEVEL UP
function levelUp() {
  userSeq = [];
  level++;

  levelDisplay.innerText = level;
  status.innerText = "Watch the pattern";

  let randColor = btns[Math.floor(Math.random() * btns.length)];
  let randBtn = document.getElementById(randColor);

  gameSeq.push(randColor);

  gameFlash(randBtn);
}

// GAME FLASH
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

// USER FLASH
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => btn.classList.remove("userFlash"), 300);
}

// BUTTON CLICK
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function () {
    if (!started) return;

    let color = this.id;
    userSeq.push(color);

    userFlash(this);

    checkAns(userSeq.length - 1);
  });
});

// CHECK ANSWER
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    gameOver();
  }
}

// GAME OVER
function gameOver() {
  status.innerHTML = `❌ Game Over! Score: <b>${level}</b>`;

  if (level > highScore) {
    highScore = level;
    localStorage.setItem("simonsayHighScore", highScore);
    highScoreDisplay.innerText = highScore;
  }

  document.body.style.background = "red";
  setTimeout(() => {
    document.body.style.background = "linear-gradient(135deg, #0f172a, #1e293b)";
  }, 200);

  reset();
}

// RESET
function reset() {
  level = 0;
  gameSeq = [];
  userSeq = [];
  started = false;
}