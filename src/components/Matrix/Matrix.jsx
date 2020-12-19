import { useCallback } from 'react';
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
  const handleCellClick = useCallback(
    (x, y) => () => {
      onCellClick(x, y);
    },
    [onCellClick]
  );

  return (
    <StyledTable>
      <StyledThead colSpan={matrix.length}>CODE MATRIX</StyledThead>
      {matrix.map((line, x) => (
        <tr key={shortid.generate()}>
          {line.map((symbol, y) => (
            <Cell
              key={shortid.generate()}
              onClick={handleCellClick(x, y)}
              disabled={history.includes(`${x}:${y}`)}
              selected={
                (selectionMode === GameSelectionModes.row &&
                  selectedIndex === x) ||
                (selectionMode === GameSelectionModes.column &&
                  selectedIndex === y)
              }
            >
              {symbol}
            </Cell>
          ))}
        </tr>
      ))}
    </StyledTable>
  );
};

export default observer(Matrix);
