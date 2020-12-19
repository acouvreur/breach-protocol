import { toJS } from 'mobx';
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
 * @param {number} props.capacity
 */
const Buffer = ({ capacity, values }) => {
  console.log('Buffer ; ', toJS(values));

  return (
    <StyledAside size={capacity}>
      {[...Array(capacity)].map((_, i) => {
        if (i >= values.length) return null;

        return <Cell key={i}>{values[i] || null}</Cell>;
      })}
    </StyledAside>
  );
};

export default observer(Buffer);
