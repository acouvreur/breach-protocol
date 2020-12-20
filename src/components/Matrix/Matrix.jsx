import { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import shortid from 'shortid';
import styled from 'styled-components';

import { GameSelectionModes } from 'model/game';
import Cell from '../_shared/Cell';

const StyledTable = styled.div`
  border: 1px solid var(--primary-color);
`;

const StyledThead = styled.div`
  background-color: var(--primary-color);
`;

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

  const isCellHovered = useCallback(
    (x, y) => {
      if (focusedCell) {
        if (x === focusedCell.x && y !== focusedCell.y) return true;
        if (x !== focusedCell.x && y === focusedCell.y) return true;
      }
      return false;
    },
    [focusedCell]
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
              hovered={isCellHovered(x, y)}
            >
              {symbol}
            </Cell>
          ))}
        </div>
      ))}
    </StyledTable>
  );
};

export default observer(Matrix);
