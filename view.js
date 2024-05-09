export default class View {
  constructor(controller) {
    this.controller = controller;
  }

  createBoardVisuals(boardState) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = document.querySelector(
          `[data-row="${row}"][data-col="${col}"]`
        );

        switch (boardState[row][col]) {
          case 0:
            cell.textContent = " ";
            break;
          case 1:
            cell.textContent = "X";
            break;
          case 2:
            cell.textContent = "O";
            break;
          default:
            console.log("Wooooot?!");
            break;
        }
      }
    }
  }

  displayPlayerOrder(currentPlayer) {
    const infoBox = document.querySelector("#infoBox");
    infoBox.innerHTML = /*html*/ `<h2>Player ${currentPlayer}'s turn!</h2>`;
  }

  displayWinner(currentPlayer) {
    const infoBox = document.querySelector("#infoBox");
    infoBox.innerHTML = "";
    infoBox.innerHTML = /*html*/ `Player ${currentPlayer}`;
  }

  displayRestartButton() {
    const html = /*html*/ `
    <div>
        <button id="restartBtn">Restart</button>
    </div>
    `;

    document.querySelector("#infoBox").insertAdjacentHTML("afterend", html);
  }
}
