export default class Model {
  constructor(controller) {
    this.boardGrid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
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
}
