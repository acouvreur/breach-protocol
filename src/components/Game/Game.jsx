import React from 'react';

import styled from 'styled-components';
import { observer } from 'mobx-react';
import Matrix from '../Matrix/Matrix';
import Buffer from '../Buffer/Buffer';
import Sequence from '../Sequence/Sequence';
import { Grid } from 'components/_shared';
import { HighlightedSymbolProvider } from 'providers/HighlightSymbolContext';

const SequenceWrapper = styled.div`
  border: 1px solid var(--primary-color);
`;

const Game = ({ game }) => {
  const onCellClick = (x, y) => {
    game.select(x, y);
  };

  return (
    <HighlightedSymbolProvider>
      <Grid spacing={1}>
        <Matrix
          matrix={game.matrix}
          selectedIndex={game.selectedIndex}
          selectionMode={game.selectionMode}
          history={game.history}
          onCellClick={onCellClick}
        />
        <Grid direction='column' spacing={1}>
          <Buffer {...game.buffer} />
          <SequenceWrapper>
            <Grid direction='column'>
              {game.sequences.map((sequence, index) => (
                <Sequence
                  key={index}
                  sequence={sequence}
                  buffer={game.buffer}
                />
              ))}
            </Grid>
          </SequenceWrapper>
        </Grid>
      </Grid>
    </HighlightedSymbolProvider>
  );
};

export default observer(Game);
