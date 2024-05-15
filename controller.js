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
    document.querySelector("body").addEventListener("click", (event) => {
      const cell = event.target;
      const row = cell.dataset.row;
      const col = cell.dataset.col;

      // Handle click outside board
      if (!cell.closest("#board") && !cell.closest("#restartBtn")) {
        console.log("Clicked outside board!");
        return;
      }

      // Handle cell click if the game is not over
      if (!this.gameOver && row !== undefined && col !== undefined) {
        console.log(`Clicked on row: ${row}, col: ${col}`);
        this.selectCell(row, col);

        // Handle restart button click regardless of the game state
      } else if (cell.closest("#restartBtn")) {
        console.log("Restarted game.");
        this.model.resetBoard();
        const boardState = this.model.getBoardState();
        this.view.createBoardVisuals(boardState);
        this.currentPlayer = 1;
        this.view.displayPlayerOrder(this.currentPlayer);
        this.gameOver = false; // Reset game over state

        // Handle click inside board but outside cell
        //  Game is over clicks
      } else if (this.gameOver) {
        console.log("Game is over");
      } else {
        console.log("Clicked outside cell!");
      }
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
