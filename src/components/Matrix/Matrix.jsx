import { useCallback, useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import shortid from 'shortid';
import styled from 'styled-components';

import { GameSelectionModes } from 'model/game';
import Cell from '../_shared/Cell';
import HighlightedSymbolContext from 'providers/HighlightSymbolContext';

const StyledTable = styled.div`
  border: 1px solid var(--primary-color);
`;

const StyledThead = styled.div`
  background-color: var(--primary-color);
`;

function getRandomId() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < 2; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 *
 * @param {Object} props
 * @param {string[][]} props.matrix
 */
const Matrix = ({
  matrix,
  selectedIndex,
  selectionMode,
  onCellClick,
  history,
}) => {
  const [focusedCell, setFocusedCell] = useState(null);
  const { highlightedSymbol } = useContext(HighlightedSymbolContext);
  const [scramble, setScramble] = useState(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setScramble(i);
      if (++i === 10) {
        clearInterval(interval);
        setScramble(null);
      }
    }, 40);
  }, []);

  const handleCellClick = useCallback(
    (x, y) => () => {
      onCellClick(x, y);
    },
    [onCellClick]
  );

  const onMouseEnter = useCallback(
    (x, y) => () => {
      setFocusedCell({ x, y });
    },
    []
  );

  const resetCurrentCell = useCallback(() => {
    setFocusedCell(null);
  }, []);

  const isCellActive = useCallback(
    (x, y) => {
      return (
        (selectionMode === GameSelectionModes.row && selectedIndex === x) ||
        (selectionMode === GameSelectionModes.column && selectedIndex === y)
      );
    },
    [selectedIndex, selectionMode]
  );

  const isCellFocused = useCallback(
    (x, y) => {
      if (focusedCell) {
        if (
          selectionMode === GameSelectionModes.column &&
          x === focusedCell.x &&
          y !== focusedCell.y
        )
          return true;
        if (
          selectionMode === GameSelectionModes.row &&
          x !== focusedCell.x &&
          y === focusedCell.y
        )
          return true;
        if (x === focusedCell.x && y === focusedCell.y) return true;
      }
      return false;
    },
    [focusedCell, selectionMode]
  );

  const isCellHighlighted = useCallback(
    (symbol, x, y) => {
      return (
        symbol === highlightedSymbol ||
        (focusedCell &&
          selectionMode === GameSelectionModes.row &&
          selectedIndex === x &&
          focusedCell.y === y) ||
        (focusedCell &&
          selectionMode === GameSelectionModes.column &&
          selectedIndex === y &&
          focusedCell.x === x)
      );
    },
    [focusedCell, highlightedSymbol, selectedIndex, selectionMode]
  );

  return (
    <StyledTable onMouseLeave={resetCurrentCell}>
      <StyledThead colSpan={matrix.length}>CODE MATRIX</StyledThead>
      {matrix.map((line, x) => (
        <div key={shortid.generate()}>
          {line.map((symbol, y) => (
            <Cell
              key={shortid.generate()}
              onClick={handleCellClick(x, y)}
              onMouseEnter={onMouseEnter(x, y)}
              disabled={history.includes(`${x}:${y}`)}
              active={isCellActive(x, y)}
              focused={isCellFocused(x, y)}
              highlighted={isCellHighlighted(symbol, x, y)}
              symbol={symbol}
              scramble={scramble ? getRandomId(2) : null}
            />
          ))}
        </div>
      ))}
    </StyledTable>
  );
};

export default observer(Matrix);
