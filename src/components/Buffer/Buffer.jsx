import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import shortid from 'shortid';
import styled from 'styled-components';
import { Cell } from '../_shared';

const StyledAside = styled.aside`
  min-height: 52px;
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
    <StyledAside>
      {[...Array(capacity)].map((_, i) => {
        return <Cell key={i}>{values[i]}</Cell>;
      })}
    </StyledAside>
  );
};

export default observer(Buffer);
