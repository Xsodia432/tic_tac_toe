let board = [];
let isWinner = "";

const container = document.getElementById("container");
//create board
function create_board() {
  row = 3;
  col = 3;

  for (var for_row = 0; for_row < row; for_row++) {
    board[for_row] = [];
    for (var for_col = 0; for_col < col; for_col++) {
      board[for_row][for_col] = "";
      container.innerHTML +=
        "<button type=button value='" +
        for_col +
        for_row +
        "' id='" +
        for_col +
        for_row +
        "'class='w-full flex items-center justify-center max-w-32 max-h-32 text-5xl grid-item text-white bg-slate-900 font-bold  p-20 border-solid border-2 border-white transition-opacity duration-300'" +
        " " +
        "</button>";
    }
  }
}
function createPlayer_constructor(name, token, score) {
  this.name = name;
  this.token = token;
  this.score = score;
}

const createPlayer = () => {
  const player1 = new createPlayer_constructor(
    prompt("Please enter Player 1 name:"),
    "X",
    0
  );
  const player2 = new createPlayer_constructor(
    prompt("Please enter Player 2 name:"),
    "O",
    0
  );
  document.getElementById("X").innerText =
    player1["name"] + " : " + player1["score"];
  document.getElementById("O").innerText =
    player2["name"] + " : " + player2["score"];
  return [player1, player2];
};

const game_controller = () => {
  create_board();
  const players = createPlayer();
  let current_player = players[0]["token"];
  document.querySelectorAll("button").forEach((e) => {
    e.addEventListener("click", () => {
      //check if the current board is already filled
      if (board[e.value[0]][e.value[1]] !== "") {
        return;
      }

      current_player = current_player === players[0] ? players[1] : players[0];
      e.innerText = current_player["token"];
      board[e.value[0]][e.value[1]] = current_player["token"];

      isWinner = check_winner(e.value[0], e.value[1], current_player);
      isGameover(isWinner[0], isWinner[1], current_player["token"]);
    });
  });
};

const check_winner = (row, col, current_player) => {
  let player = "";
  let score = 0;
  //check row
  if (board[row].every((token) => token === current_player["token"])) {
    player = current_player["name"];
    score = current_player["score"] += 1;
  }
  //check column
  if (board.every((token) => token[col] === current_player["token"])) {
    player = current_player["name"];
    score = current_player["score"] += 1;
  }
  //check leftside X
  if (board.every((row, i) => row[i] === current_player["token"])) {
    player = current_player["name"];
    score = current_player["score"] += 1;
  }

  //check rightside X
  if (board.every((row, i) => row[2 - i] === current_player["token"])) {
    player = current_player["name"];
    score = current_player["score"] += 1;
  }

  return [player, score];
};

const isGameover = (name, score, token) => {
  let allFilled = board.every(function (subArray) {
    return subArray.every(function (element) {
      return element !== "";
    });
  });
  if (allFilled && name === "") {
    clear_board();
    document.getElementById("game_status").innerText = "Draw";
  } else if (name != "" || allFilled) {
    clear_board();
    document.getElementById("game_status").innerText = "Winner: " + name;
    document.getElementById(token).innerText = name + " : " + score;
  }

  return;
};

const clear_board = () => {
  document.querySelectorAll("button").forEach((e) => {
    e.innerText = "";
    board[e.value[0]][e.value[1]] = "";
  });
  isWinner = "";
};

game_controller();
