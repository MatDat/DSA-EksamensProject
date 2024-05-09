import Model from "./model.js";
import View from "./view.js";

class Controller {
  constructor() {
    this.model = new Model(this);
    this.view = new View(this);

    window.model = this.model;
  }
  currentPlayer = 1;

  initialize() {
    this.setupBoard();
    this.clickableBoard();
    this.view.displayRestartButton();
    this.handleRestartBtn();
  }

  setupBoard() {
    const boardState = this.model.getBoardState();
    this.view.createBoardVisuals(boardState);

    //Set initial currentPlayer = 1
    this.view.displayPlayerOrder(this.currentPlayer);
  }

  clickableBoard() {
    document
      .querySelector("#board")
      .addEventListener("click", this.handleClick.bind(this));
  }

  handleClick(event) {
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    if (row !== undefined && col !== undefined) {
      console.log(`Clicked on row: ${row}, col: ${col}`);
      this.selectCell(row, col);
    } else {
      console.log("Not a cell!");
    }
  }

  handleRestartBtn() {
    document.querySelector("#restartBtn").addEventListener("click", () => {
      this.model.resetBoard();
      const boardState = this.model.getBoardState();
      this.view.createBoardVisuals(boardState);
      this.currentPlayer = 1;
      this.view.displayPlayerOrder(this.currentPlayer);
    });
  }

  selectCell(row, col) {
    if (this.model.readFromCell(row, col) === 0) {
      this.model.writeToCell(row, col, this.currentPlayer);
      const boardState = this.model.getBoardState();
      this.view.createBoardVisuals(boardState);
      this.nextTurn();
    } else {
      console.log("Click another cell!");
    }
  }

  nextTurn() {
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else if (this.currentPlayer === 2) {
      this.currentPlayer = 1;
    }
    // AFTER move, update currentplayer display
    this.view.displayPlayerOrder(this.currentPlayer);
  }
}

let controller = new Controller();
window.addEventListener("load", () => controller.initialize());
