export default class View {
  constructor() {}

  createBoardVisuals(boardState) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = document.querySelector(
          `[data-row="${row}"][data-col="${col}"]`
        );
        cell.textContent =
          boardState[row][col] === 1
            ? "X"
            : boardState[row][col] === 2
            ? "O"
            : "";
      }
    }
  }

  displayPlayerOrder(currentPlayer) {
    const infoBox = document.querySelector("#infoBox");
    infoBox.innerHTML = `<h2>Player ${currentPlayer}'s turn!</h2>`;
  }

  displayWinner(winner) {
    const infoBox = document.querySelector("#infoBox");
    infoBox.innerHTML = `<h2>!! PLAYER ${winner} WINS !!</h2>
      <p style="margin-top:10px;">Press restart to play again.</p>`;
  }

  displayDraw() {
    const infoBox = document.querySelector("#infoBox");
    infoBox.innerHTML = `<h2>!! DRAW !!</h2>
      <p style="margin-top:10px;">Press restart to play again.</p>`;
  }

  displayRestartButton() {
    const restartButton = document.createElement("button");
    restartButton.id = "restartBtn";
    restartButton.textContent = "Restart";
    document
      .querySelector("#infoBox")
      .insertAdjacentElement("afterend", restartButton);
  }
}
