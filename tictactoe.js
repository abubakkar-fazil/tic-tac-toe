let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-game-btn");
let msg = document.querySelector("#msg");
let msgConatainer = document.querySelector(".msg-container");
let turnO = true;
let count = 0;
const winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBox();
  msgConatainer.classList.add("hidden");
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#B9375D"
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color="#030200ff";
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if(count === 9 && !isWinner){
        gameDraw();
    }
  });
});

const gameDraw = ()=>{
    msg.innerText = `Game was a Draw`;
    msgConatainer.classList.remove("hidden");
    disableBox();
}

const disableBox = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgConatainer.classList.remove("hidden");
  disableBox();
};
const checkWinner = () => {
  for (let pattern of winningPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
