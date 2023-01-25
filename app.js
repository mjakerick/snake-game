// define variables for Snake Game
let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let left = document.querySelector(".left");
let bottom = document.querySelector(".bottom");
let right = document.querySelector(".right");
let up = document.querySelector(".top");
let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

// when HTML is loaded, sets an eventListener to check for keyboard inputs
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("onkeydown", control);
  createBoard();
  startGame();
  playAgain.addEventListener("click", replay);
});

// // logs arrow inputs in console
// document.onkeydown = (e) => {
//   e = e || window.event;
//   if (e.keyCode === 38) {
//     console.log('up arrow pressed')
//   } else if (e.keyCode === 40) {
//     console.log('down arrow pressed')
//   } else if (e.keyCode === 37) {
//     console.log('left arrow pressed')
//   } else if (e.keyCode === 39) {
//     console.log('right arrow pressed')
//   }
// }

// creates 10 x 10 grid gameBoard, 100 grid board
function createBoard() {
  popup.style.display = "none";
  for (let i = 0; i < 100; i++) {
    let div = document.createElement("div");
    grid.appendChild(div);
  }
}

// starts game and sets initial game settings
function startGame() {
  let squares = document.querySelectorAll(".grid div");
  randomApple(squares);
  //random apple
  direction = 1;
  scoreDisplay.innerHTML = score;
  intervalTime = 1000;
  currentSnake = [2, 1, 0];
  currentIndex = 0;
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  interval = setInterval(moveOutcome, intervalTime);
}

// calls checkForHits. Game ends if true, snake moves if false
function moveOutcome() {
  let squares = document.querySelectorAll(".grid div");
  if (checkForHits(squares)) {
    alert("you hit something");
    popup.style.display = "flex";
    return clearInterval(interval);
  } else {
    moveSnake(squares);
  }
}

// removes last element of currentSnake array and creates new element at the front
function moveSnake(squares) {
  let tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  // movement ends here
  eatApple(squares, tail);
  squares[currentSnake[0]].classList.add("snake");
}

// returns true if the snake hit something, false if not
function checkForHits(squares) {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width <= 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    return true;
  } else {
    return false;
  }
}

// called from moveSnake function every time the snake moves a space. Snake gets larger, moves faster, score increases by 1, new apple created
function eatApple(squares, tail) {
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    randomApple(squares);
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcome, intervalTime);
  }
}

// picks random spot to create new apple
function randomApple(squares) {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

// keyboard functionality for arrow keys
function control(e) {
  if (e.keycode === 39) {
    direction = 1; // right
  } else if (e.keycode === 38) {
    direction = -width; //if we press the up arrow, the snake will go ten divs up
  } else if (e.keycode === 37) {
    direction = -1; // left, the snake will go left one div
  } else if (e.keycode === 40) {
    direction = +width; // down the snake head will instantly appear 10 divs below from the current div
  }
}

// mobile functionality
up.addEventListener("click", () => (direction = -width));
bottom.addEventListener("click", () => (direction = +width));
left.addEventListener("click", () => (direction = -1));
right.addEventListener("click", () => (direction = 1));

// replay function
function replay() {
  grid.innerHTML = "";
  createBoard();
  startGame();
  popup.style.display = "none";
}

// document.onkeydown = (e) => {
//   e = e || window.event;
//   if (e.keyCode === 38) {
//     console.log('up arrow pressed')
//   } else if (e.keyCode === 40) {
//     console.log('down arrow pressed')
//   } else if (e.keyCode === 37) {
//     console.log('left arrow pressed')
//   } else if (e.keyCode === 39) {
//     console.log('right arrow pressed')
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   document.addEventListener("keyup", control);
//   createBoard();
//   startGame();
//   playAgain.addEventListener("click", replay);
// });
