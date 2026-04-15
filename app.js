let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;

let btns = ["red", "yellow", "green", "purple"];
let speed = 600;

let difficultySelect = document.getElementById("difficulty");
// UI Elements
let levelDisplay = document.getElementById("level");
let highScoreDisplay = document.getElementById("highScore");
let status = document.getElementById("status");
let startBtn = document.getElementById("startBtn");

let strictMode = false;

document.getElementById("strictMode").addEventListener("change", function () {
  strictMode = this.checked;
});

// High Score
let highScore = localStorage.getItem("simonsayHighScore") || 0;
highScoreDisplay.innerText = highScore;

difficultySelect.addEventListener("change", function () {
  speed = Number(this.value);
});

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

  levelDisplay.innerText = level; // show current first
  status.innerText = "Watch carefully...";

  let randColor = btns[Math.floor(Math.random() * btns.length)];
  gameSeq.push(randColor);

  playSequence();

  level++; // move increment to END
}

function playSequence() {
  let i = 0;

  let interval = setInterval(() => {
    let btn = document.getElementById(gameSeq[i]);
    gameFlash(btn);
    i++;

    if (i >= gameSeq.length) {
      clearInterval(interval);
      status.innerText = "Your turn!";
    }
  }, speed);
}

// SOUND
function playSound(color) {
  let sound = document.getElementById(color + "Sound");
  if (sound) sound.play();
}

function gameFlash(btn) {
  playSound(btn.id);
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
  playSound(btn.id);
  btn.classList.add("userFlash");
  setTimeout(() => btn.classList.remove("userFlash"), 200);
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

// // SOUND
// function playSound(color) {
//   let sound = document.getElementById(color + "Sound");
//   if (sound) sound.play();
// }

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

function gameOver() {
  document.getElementById("wrongSound").play();

  document.body.classList.add("shake");

  if (strictMode) {
    status.innerHTML = `❌ Game Over! Click Start to play again`;
    reset(); // only reset
  } else {
    status.innerHTML = `❌ Game Over! Score: <b>${level}</b>`;
    reset();
  }

  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 400);

  if (level > highScore) {
    highScore = level;
    localStorage.setItem("simonsayHighScore", highScore);
    highScoreDisplay.innerText = highScore;
  }
}

// RESET
function reset() {
  level = 0;
  gameSeq = [];
  userSeq = [];
  started = false;
}