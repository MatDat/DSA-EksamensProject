import Model from "./model.js";
import View from "./view.js";

class Controller {
  constructor() {
    this.model = new Model(this);
    this.view = new View(this);

    window.model = this.model;
    this.gameOver = false;
  }
  currentPlayer = 1;

  initialize() {
    this.setupBoard();
    this.clickHandler();
    this.view.displayRestartButton();
  }

  setupBoard() {
    const boardState = this.model.getBoardState();
    this.view.createBoardVisuals(boardState);
    //Set initial currentPlayer = 1
    this.view.displayPlayerOrder(this.currentPlayer);
  }

    clickHandler() {
    document.querySelector("#board").addEventListener("click", (event) => {
      const cell = event.target;
      const row = cell.dataset.row;
      const col = cell.dataset.col;

      if (row !== undefined && col !== undefined && !this.gameOver) {
        this.selectCell(row, col);
      }
    });

    document.querySelector("#restartBtn").addEventListener("click", () => {
      this.model.resetBoard();
      const boardState = this.model.getBoardState();
      this.view.createBoardVisuals(boardState);
      this.currentPlayer = 1;
      this.view.displayPlayerOrder(this.currentPlayer);
      this.gameOver = false;
    });
  }

  selectCell(row, col) {
    if (this.model.readFromCell(row, col) === 0) {
      this.model.writeToCell(row, col, 1);
      const boardState = this.model.getBoardState();
      this.view.createBoardVisuals(boardState);

      const winner = this.model.checkWinner();

      if (winner !== 0) {
        this.view.displayWinner(winner);
        this.gameOver = true;
      } else if (this.model.checkDraw()) {
        this.view.displayDraw();
        this.gameOver = true;
      } else {
        this.nextTurn();
      }
    } else {
      console.log("Click another cell!");
    }
  }

   nextTurn() {
    if (this.currentPlayer === 1) {
      this.model.computerMove();
      const boardState = this.model.getBoardState();
      this.view.createBoardVisuals(boardState);

      const winner = this.model.checkWinner();
      if (winner !== 0) {
        this.view.displayWinner(winner);
        this.gameOver = true;
      } else if (this.model.checkDraw()) {
        this.view.displayDraw();
        this.gameOver = true;
      } else {
        this.currentPlayer = 2;
        this.view.displayPlayerOrder(this.currentPlayer);
      }
    } else {
      this.currentPlayer = 1;
      this.view.displayPlayerOrder(this.currentPlayer);
    }
  }
}

let controller = new Controller();
window.addEventListener("load", () => controller.initialize());
