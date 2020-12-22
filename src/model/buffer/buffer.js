import { makeAutoObservable } from 'mobx';

class Buffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.values = [];

    makeAutoObservable(this);
  }

  get position() {
    return this.values.length;
  }

  isEmpty() {
    return this.values.length === 0;
  }

  isFull() {
    return this.values.length === this.capacity;
  }

  addEntry(value) {
    if (this.isFull()) {
      throw Error('Buffer is full');
    }

    this.values.push(value);
  }

  containsSequence(sequence) {
    return this.values.join('').includes(sequence.join(''));
  }

  canContainSequence(sequence) {
    const remainingSpace = this.capacity - this.values.length;
    if (remainingSpace < sequence.length) {
      for (let i = 1; i <= remainingSpace; i++) {
        const startOfSequenceNeeded = sequence
          .slice(0, sequence.length - i)
          .toString();
        if (this.values.toString().endsWith(startOfSequenceNeeded)) {
          return true;
        }
      }
      return false;
    }
    return true;
  }
}

export default Buffer;
