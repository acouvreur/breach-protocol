const states = Object.freeze({
  created: 'CREATED',
  started: 'STARTED',
  finished: 'FINISHED',
});

const selectionModes = Object.freeze({
  row: 'ROW',
  column: 'COLUMN',
});

class Game {
  constructor(buffer, sequences, matrix) {
    if (!buffer.isEmpty()) {
      throw Error('Buffer must be empty');
    }

    this.buffer = buffer;

    if (sequences.length === 0) {
      throw Error('At least one sequence must be provided');
    }
    this.sequences = sequences;

    this.matrix = matrix;
    this.selectedIndex = 0;
    this.history = [];
  }

  get state() {
    if (this.buffer.isFull()) {
      return states.finished;
    }
    return this.state;
  }

  get selectionMode() {
    return this.buffer.position % 2 === 0
      ? selectionModes.row
      : selectionModes.column;
  }

  create() {
    this.state = states.created;
  }

  select(x, y) {
    if (this.history.includes(`${x}:${y}`)) {
      throw Error('Cannot select an already visited cell');
    }

    if (this.selectionMode === selectionModes.row && x !== this.selectedIndex) {
      throw Error(`Selected row must be ${this.selectedIndex}`);
    }

    if (
      this.selectionMode === selectionModes.column &&
      y !== this.selectedIndex
    ) {
      throw Error(`Selected column must be ${this.selectedIndex}`);
    }

    const value = this.matrix[x][y];
    this.selectedIndex = this.selectionMode === selectionModes.row ? y : x;
    this.history.push(`${x}:${y}`);

    this.buffer.addEntry(value);

    return value;
  }
}

export default Game;

export { states as GameStates, selectionModes as GameSelectionModes };
