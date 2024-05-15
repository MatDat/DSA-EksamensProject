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

  computerMove() {
    let bestScore = -Infinity;
    let move;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.boardGrid[row][col] === 0) {
          this.boardGrid[row][col] = 2;
          let score = this.minmax(this.boardGrid, 0, false);
          this.boardGrid[row][col] = 0;

          console.log("board:" + this.boardGrid);
          console.log("score: " + score);
          if (score > bestScore) {
            bestScore = score;
            move = { row, col };
          }
        }
      }
    }
    if (move) {
      this.writeToCell(move.row, move.col, 2);
      console.log("FNUUUUG");
    }
  }

  minmax(boardGrid, depth, isMaximizing) {
    const score = this.checkWinner();

    if (score === 10) return score - depth;
    if (score === -10) return score + depth;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (boardGrid[row][col] === 0) {
            boardGrid[row][col] = 2;
            bestScore = Math.max(
              bestScore,
              this.minmax(boardGrid, depth + 1, false)
            );
            boardGrid[row][col] = 0;
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (boardGrid[row][col] === 0) {
            boardGrid[row][col] = 1;
            bestScore = Math.max(
              bestScore,
              this.minmax(boardGrid, depth + 1, true)
            );
            boardGrid[row][col] = 0;
          }
        }
      }
      return bestScore;
    }
  }
}
