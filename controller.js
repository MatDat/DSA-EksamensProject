import Model from "./model.js";
import View from "./view.js";

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();

    this.view.displayRestartButton();
    this.view.createBoardVisuals(this.model.getBoard());
    this.view.displayPlayerOrder(this.model.currentPlayer);

    this.clickHandler();
  }

  clickHandler() {
    document.querySelector("#board").addEventListener("click", (event) => {
      const cell = event.target;
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);

      if (row !== undefined && col !== undefined && !this.model.checkWinner()) {
        this.selectCell(row, col);
      }
    });

    document.querySelector("#restartBtn").addEventListener("click", () => {
      this.model.resetBoard();
      this.view.createBoardVisuals(this.model.getBoard());
      this.model.currentPlayer = 1;
      this.view.displayPlayerOrder(this.model.currentPlayer);
    });
  }

  selectCell(row, col) {
    if (this.model.readFromCell(row, col) === 0) {
      this.model.writeToCell(row, col, this.model.currentPlayer);
      this.view.createBoardVisuals(this.model.getBoard());

      const winner = this.model.checkWinner();
      if (winner !== 0) {
        this.view.displayWinner(winner);
      } else if (this.model.checkDraw()) {
        this.view.displayDraw();
      } else {
        this.nextTurn();
      }
    } else {
      console.log("Click another cell!");
    }
  }

  nextTurn() {
    if (this.model.currentPlayer === 1) {
      this.model.currentPlayer = 2;
      this.model.computerMove();
      this.view.createBoardVisuals(this.model.getBoard());

      const winner = this.model.checkWinner();
      if (winner !== 0) {
        this.view.displayWinner(winner);
      } else if (this.model.checkDraw()) {
        this.view.displayDraw();
      } else {
        this.model.currentPlayer = 1;
        this.view.displayPlayerOrder(this.model.currentPlayer);
      }
    }
  }
}

window.addEventListener("load", () => new Controller());
