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
}

export default Buffer;
