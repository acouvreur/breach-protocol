import { useContext } from 'react';
import { observer } from 'mobx-react';
import HighlightedSymbolContext from 'providers/HighlightSymbolContext';
import styled from 'styled-components';
import { Cell } from '../_shared';

const StyledAside = styled.aside`
  min-height: 52px;
  min-width: ${(props) => `calc(60px * ${props.size})`};
`;

/**
 *
 * @param {Object} props
 * @param {number} props.sequence
 */
const Sequence = ({ sequence }) => {
  const { setHighlightedSymbol } = useContext(HighlightedSymbolContext);

  return (
    <StyledAside>
      {sequence.map((symbol, i) => {
        return (
          <Cell
            onMouseEnter={() => setHighlightedSymbol(symbol)}
            onMouseLeave={() => setHighlightedSymbol(null)}
            key={i}
            symbol={sequence[i]}
          />
        );
      })}
    </StyledAside>
  );
};

export default observer(Sequence);
