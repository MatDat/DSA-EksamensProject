export default class Model {
  constructor() {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.currentPlayer = 1;
  }

  resetBoard() {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }

  getBoard() {
    return this.board;
  }

  writeToCell(row, col, player) {
    this.board[row][col] = player;
  }

  readFromCell(row, col) {
    return this.board[row][col];
  }

  checkWinner() {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2] &&
        this.board[i][0] !== 0
      ) {
        return this.board[i][0];
      }
      if (
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i] &&
        this.board[0][i] !== 0
      ) {
        return this.board[0][i];
      }
    }
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2] &&
      this.board[0][0] !== 0
    ) {
      return this.board[0][0];
    }
    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0] &&
      this.board[0][2] !== 0
    ) {
      return this.board[0][2];
    }
    return 0;
  }

  checkDraw() {
    for (let row of this.board) {
      for (let cell of row) {
        if (cell === 0) {
          return false;
        }
      }
    }
    return true;
  }

  minimax(board, depth, isMaximizing) {
    let winner = this.checkWinner();
    if (winner !== 0) {
      return winner === 2 ? 10 - depth : depth - 10;
    }
    if (this.checkDraw()) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === 0) {
            board[row][col] = 2;
            let score = this.minimax(board, depth + 1, false);
            board[row][col] = 0;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === 0) {
            board[row][col] = 1;
            let score = this.minimax(board, depth + 1, true);
            board[row][col] = 0;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  computerMove() {
    let bestScore = -Infinity;
    let move;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === 0) {
          this.board[row][col] = 2;
          let score = this.minimax(this.board, 0, false);
          this.board[row][col] = 0;
          if (score > bestScore) {
            bestScore = score;
            move = { row, col };
          }
        }
      }
    }
    if (move) {
      this.writeToCell(move.row, move.col, 2);
    }
  }
}
