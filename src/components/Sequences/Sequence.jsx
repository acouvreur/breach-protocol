import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Cell } from '../_shared';

const StyledAside = styled.aside`
  min-height: 52px;
  min-width: ${(props) => `calc(60px * ${props.size})`};
  border: 1px solid var(--primary-color);
`;

/**
 *
 * @param {Object} props
 * @param {number} props.sequence
 */
const Sequence = ({ sequence }) => {
  return (
    <StyledAside>
      {sequence.map((_, i) => {
        return <Cell key={i}>{sequence[i]}</Cell>;
      })}
    </StyledAside>
  );
};

export default observer(Sequence);
