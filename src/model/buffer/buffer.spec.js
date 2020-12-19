import Buffer from './buffer';

describe('A Buffer', () => {
  it('should throw an error if the buffer is full when adding an entry', () => {
    const buffer = new Buffer(2);
    buffer.addEntry('BC');
    buffer.addEntry('BC');

    const throws = () => buffer.addEntry('BC');

    expect(throws).toThrowError('Buffer is full');
  });

  it('should have position 1 when there is one element in the buffer', () => {
    const buffer = new Buffer(2);
    buffer.addEntry('BC');

    const position = buffer.position;

    expect(position).toEqual(1);
  });

  it('should return true if the sequence BD 1C BD is in the buffer', () => {
    const buffer = new Buffer(5);

    buffer.addEntry('BC');
    buffer.addEntry('1C');
    buffer.addEntry('BC');

    expect(buffer.containsSequence(['BC', '1C', 'BC'])).toEqual(true);
  });

  it('should return false if the sequence BD 1C BD is not in the buffer', () => {
    const buffer = new Buffer(5);

    buffer.addEntry('BC');
    buffer.addEntry('1C');
    buffer.addEntry('1C');
    buffer.addEntry('BC');

    expect(buffer.containsSequence(['BC', '1C', 'BC'])).toEqual(false);
  });
});
