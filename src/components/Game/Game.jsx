import React from 'react';
import { observer } from 'mobx-react';
import Matrix from '../Matrix/Matrix';
import Buffer from '../Buffer/Buffer';
import Sequences from '../Sequences/Sequences';
import { Grid } from 'components/_shared';
import { HighlightedSymbolProvider } from 'providers/HighlightSymbolContext';

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
          <Sequences sequences={game.sequences} />
        </Grid>
      </Grid>
    </HighlightedSymbolProvider>
  );
};

export default observer(Game);
