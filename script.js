const boardEle = document.getElementById("board-container");
const createEle = document.getElementById("create-player");
const playerContainer = document.getElementById("player-container");
const resetGame = document.getElementById("reset-game");
let players = [];

function gameController() {
  const playerController = (...args) => {
    const playerName = document.createElement("h2");
    let score = 0;
    const name = args[0];
    const marker = args[1];

    const setUi = () => {
      playerName.textContent = `${name}: ${score}`;
      playerContainer.appendChild(playerName);
    };
    const scoreHandler = () => {
      score += 1;
      playerName.textContent = `${name}: ${score}`;
    };

    return { name, marker, setUi, scoreHandler };
  };

  const displayController = () => {
    boardEle.textContent = "";
    const board = ["", "", "", "", "", "", "", "", ""];
    let currentSymbol = "X";
    for (let i = 0; i < board.length; i++) {
      const clickArea = document.createElement("button");
      clickArea.addEventListener("click", () => {
        if (board[i] !== "") return;

        board[i] = currentSymbol;

        clickArea.textContent = currentSymbol;
        if (checkWinner(currentSymbol, board)) displayController();
        if (board.every(boardFilled) && !checkWinner(currentSymbol, board)) {
          alert("Draw");
          displayController();
        }
        currentSymbol = currentSymbol === "X" ? "O" : "X";
      });
      boardEle.appendChild(clickArea);
    }
  };
  return { displayController, playerController };
}

function checkWinner(currentSymbol, board) {
  for (let i = 0; i < board.length; i += 3) {
    if (
      board[i] !== "" &&
      board[i] === board[i + 1] &&
      board[i] === board[i + 2]
    ) {
      players.find((val) => val.marker === currentSymbol).scoreHandler();
      alert(
        "Winner is : " +
          players.find((val) => val.marker === currentSymbol).name
      );
      return true;
    }
  }
  for (let i = 0; i < 3; i++) {
    if (board[i] !== "") {
      if (board[i] === board[i + 3] && board[i] === board[i + 6]) {
        players.find((val) => val.marker === currentSymbol).scoreHandler();
        alert(
          "Winner is : " +
            players.find((val) => val.marker === currentSymbol).name
        );
        return true;
      }
      if (board[i] === board[i + 4] && board[i] === board[i + 8]) {
        players.find((val) => val.marker === currentSymbol).scoreHandler();
        alert(
          "Winner is : " +
            players.find((val) => val.marker === currentSymbol).name
        );
        return true;
      }
    }
  }
  if (board[2] !== "" && board[2] === board[4] && board[2] === board[6]) {
    players.find((val) => val.marker === currentSymbol).scoreHandler();
    alert(
      "Winner is : " + players.find((val) => val.marker === currentSymbol).name
    );
    return;
  }
}
function boardFilled(board) {
  return board !== "";
}
function addPlayers() {
  const gameControllerFunc = gameController();

  if (players.length >= 2) {
    alert("already maxed player");
    return;
  }

  players.push(
    gameControllerFunc.playerController(prompt("Enter Player 1 name"), "X")
  );

  players.push(
    gameControllerFunc.playerController(prompt("Enter Player 2 name"), "X")
  );

  players[0].setUi();
  players[1].setUi();
  gameControllerFunc.displayController();
}

document.getElementById("start-game").addEventListener("click", (ev) => {
  document.getElementById("main-content").style.display = "block";
  ev.target.style.display = "none";
  addPlayers();
});
resetGame.addEventListener("click", (ev) => {
  players = [];
  playerContainer.textContent = "";
  addPlayers();
});
