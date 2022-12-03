const symbols = ['55', '1C', 'E7', 'BD', 'F9', 'K3', 'L1'];

function getRandomValueFromArray(array) {
  return array[getRandomInt(0, array.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomSubArray(array, subArrayLength) {
  const start = getRandomInt(0, array.length - subArrayLength + 1);
  return array.slice(start, start + subArrayLength);
}

class MatrixGenerator {

  constructor(bufferLength, matrixHeight, matrixWidth) {
    this._sequence = Array.from({ length: bufferLength }, (v) => getRandomValueFromArray(symbols));;
    this._matrixHeight = matrixHeight;
    this._matrixWidth = matrixWidth;

    this._sequences = [
      getRandomSubArray(this._sequence, 2),
      getRandomSubArray(this._sequence, 3),
      getRandomSubArray(this._sequence, 4),
    ];

    this._matrix = this._createMatrix();
  }

  generate() {
    this._fillCriticalPath();
    this._fillMatrix();
  }

  getMatrix() {
    return this._matrix;
  }

  getSequences() {
    return this._sequences;
  }

  _createMatrix() {
    return Array.from({ length: this._matrixHeight }, (v) => Array.from({ length: this._matrixWidth }, (v) => null));
  }

  _fillCriticalPath() {
    let currentIndex = [0, 0];
    let isHorizontal = true;
    for (let i = 0; i < this._sequence.length; i++) {
      currentIndex = this._getRandomEmptyCellInMatrix(currentIndex, isHorizontal);
      this._matrix[currentIndex[0]][currentIndex[1]] = this._sequence[i];
      isHorizontal = !isHorizontal;
    }
  }

  _getRandomEmptyCellInMatrix(currentIndex, isHorizontal) {
    let index = currentIndex;
    if (isHorizontal) {
      while (this._matrix[index[0]][index[1]] != null) {
        index = [currentIndex[0], getRandomInt(0, this._matrixWidth)];
      }
    } else {
      while (this._matrix[index[0]][index[1]] != null) {
        index = [getRandomInt(0, this._matrixHeight), currentIndex[1]];
      }
    }
    return index;
  }

  _fillMatrix() {
    for (let i = 0; i < this._matrixHeight; i++) {
      for (let j = 0; j < this._matrixWidth; j++) {
        if (this._matrix[i][j] == null) {
          this._matrix[i][j] = getRandomValueFromArray(symbols);
        }
      }
    }
  }
}


export default MatrixGenerator;
