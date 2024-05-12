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

    //If no winner found
    return 0;
  }
}
