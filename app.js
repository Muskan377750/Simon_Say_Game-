let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;
let btns = ["yellow", "red", "purple", "green"];
let highScore = localStorage.getItem("simonsayHighScore")||0;

let h3 = document.querySelector("h3");
let h4 =document.querySelector("h4");

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});

function levelUp() {
  level++;
  userSeq = [];
  h3.innerText = `Level ${level}`;
  randIdx = Math.floor(Math.random() * 3);
  randColor = btns[randIdx];
  randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  gameFlash(randBtn);
}
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if(level>highScore){
      highScore=level;
      localStorage.setItem("simonsayHighScore",highScore);
    }
    h3.innerHTML = `Game over!! Your Score is <b>${level}</b>. <br> Please press any key to start again.`;
    h4.innerText = `High Score: ${highScore}`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}
function reset() {
  level = 0;
  started = false;
  gameSeq = [];
  userSeq = [];
}

 
   
  
