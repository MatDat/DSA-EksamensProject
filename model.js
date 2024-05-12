export default class Model {
  constructor(controller) {
    this.controller = controller;
    this.boardGrid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }

  resetBoard() {
    this.boardGrid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    return this.boardGrid;
  }

  writeToCell(row, col, value) {
    this.boardGrid[row][col] = value;
  }

  readFromCell(row, col) {
    return this.boardGrid[row][col];
  }

  getBoardState() {
    return this.boardGrid;
  }

  checkDraw() {
    for (let row = 0; row < this.boardGrid.length; row++) {
      for (let col = 0; col < this.boardGrid[row].length; col++) {
        const isEmptyCell = this.boardGrid[row][col] === 0;
        const isWinnerFound = this.checkWinner() !== 0;

        // If no winner + empty cells = ongoing game
        if (!isWinnerFound && isEmptyCell) {
          return false; // Ongoing game
        }
      }
    }
    return true; // No empty cells and no winner = Draw
  }

  checkWinner() {
    //Check rows
    for (let row = 0; row < 3; row++) {
      if (
        this.boardGrid[row][0] !== 0 &&
        this.boardGrid[row][0] === this.boardGrid[row][1] &&
        this.boardGrid[row][0] === this.boardGrid[row][2]
      ) {
        return this.boardGrid[row][0];
      }
    }

    //Check cols
    for (let col = 0; col < 3; col++) {
      if (
        this.boardGrid[0][col] !== 0 &&
        this.boardGrid[0][col] === this.boardGrid[1][col] &&
        this.boardGrid[0][col] === this.boardGrid[2][col]
      ) {
        return this.boardGrid[0][col];
      }
    }

    //Check diagonals
    if (
      this.boardGrid[0][0] !== 0 &&
      this.boardGrid[0][0] === this.boardGrid[1][1] &&
      this.boardGrid[0][0] === this.boardGrid[2][2]
    ) {
      return this.boardGrid[0][0];
    }

    if (
      this.boardGrid[2][0] !== 0 &&
      this.boardGrid[2][0] === this.boardGrid[1][1] &&
      this.boardGrid[2][0] === this.boardGrid[0][2]
    ) {
      return this.boardGrid[2][0];
    }

    //If no winner found
    return 0;
  }
}
