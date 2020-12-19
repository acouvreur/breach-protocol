import Buffer from './buffer/buffer';
import Game, { GameStates, GameSelectionModes } from './game';

/**
 * @type {Buffer}
 */
let buffer;

/**
 * @type {Game}
 */
let game;

let sequences;
let matrix;

describe('A Game', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    buffer = new Buffer();
    sequences = ['ABC'];
    matrix = [[]];
    game = new Game(buffer, sequences, matrix);
  });

  it('should have an array of sequences', () => {
    expect(game.sequences).toBeDefined();
  });

  it('should have a buffer', () => {
    expect(game.buffer).toBeDefined();
  });

  it('should have a matrix', () => {
    expect(game.matrix).toBeDefined();
  });

  it('should throw an error if the buffer is not empty', () => {
    buffer = new Buffer();
    jest.spyOn(buffer, 'isEmpty').mockReturnValue(false);

    const throws = () => new Game(buffer, [], [[]]);

    expect(throws).toThrowError('Buffer must be empty');
  });

  it('should throw an error if no sequence is provided', () => {
    const throws = () => new Game(buffer, [], [[]]);

    expect(throws).toThrowError('At least one sequence must be provided');
  });

  it('should add a "BD" entry to the buffer on selection', () => {
    const addEntrySpy = jest.spyOn(buffer, 'addEntry');
    game.matrix[0][0] = 'BD';

    game.select(0, 0);

    expect(addEntrySpy).toHaveBeenCalledWith('BD');
  });

  it('stops when the buffer is full', () => {
    // Act
    jest.spyOn(game.buffer, 'isFull').mockReturnValue(true);

    // Observe / Result
    expect(game.state).toEqual(GameStates.finished);
  });

  it('matrix should "BD" when selecting 0x0', () => {
    game.matrix = [
      ['BD', '1C', 'BD', 'BD', 'BD', '1C'],
      ['1C', '55', '55', 'E9', '1C', '55'],
    ];

    const value = game.select(0, 0);

    expect(value).toEqual('BD');
  });

  it('matrix should "E9" when selecting 1x3', () => {
    game.matrix = [
      ['BD', '1C', 'BD', 'BD', 'BD', '1C'],
      ['1C', '55', '55', 'E9', '1C', '55'],
    ];

    game.select(0, 3);
    const value = game.select(1, 3);

    expect(value).toEqual('E9');
  });

  it('should have a selection mode to "ROW" when buffer position is pair', () => {
    jest.spyOn(buffer, 'position', 'get').mockReturnValue(0);

    expect(game.selectionMode).toEqual(GameSelectionModes.row);
  });

  it('should have a selection mode to "COLUMN" when buffer position is odd', () => {
    jest.spyOn(buffer, 'position', 'get').mockReturnValue(1);

    expect(game.selectionMode).toEqual(GameSelectionModes.column);
  });

  it('should have a select index to 0 on creation', () => {
    expect(game.selectedIndex).toEqual(0);
  });

  it('should throw an error if selected X is not equal to selected index on ROW selection mode', () => {
    const throws = () => game.select(1, 4);

    expect(throws).toThrowError('Selected row must be 0');
  });

  it('should set the select index to 2 when selecting 3rd element of the first row', () => {
    game.select(0, 2);

    expect(game.selectedIndex).toEqual(2);
  });

  it('should set the selection mode to column when selecting 3rd element of the first row', () => {
    game.select(0, 2);

    expect(game.selectionMode).toEqual(GameSelectionModes.column);
  });

  it('should throw an error if selected Y is not equal to selected index on COLUMN selection mode', () => {
    game.select(0, 2);

    const throws = () => game.select(1, 4);

    expect(throws).toThrowError('Selected column must be 2');
  });

  it('should throw an error if you attempt to select an already selected cell', () => {
    game.select(0, 1);
    const throws = () => game.select(0, 1);

    expect(throws).toThrowError('Cannot select an already visited cell');
  });
});
