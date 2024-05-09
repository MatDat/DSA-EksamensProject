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
  }

  setupBoard() {
    const boardState = this.model.getBoardState();
    this.view.createBoard(boardState);
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

  selectCell(row, col) {
    if (this.model.readFromCell(row, col) === 0) {
      this.model.writeToCell(row, col, this.currentPlayer);
      const boardState = this.model.getBoardState();
      this.view.createBoard(boardState);
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
  }
}

let controller = new Controller();
window.addEventListener("load", () => controller.initialize());
