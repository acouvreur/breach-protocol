import Sequence from './Sequence';
import { Grid } from 'components/_shared';

import styled from 'styled-components';

const SequenceWrapper = styled.div`
  border: 1px solid var(--primary-color);
`;

const Sequences = ({ sequences }) => {
  return (
    <SequenceWrapper>
      <Grid direction='column'>
        {sequences.map((sequence) => (
          <Sequence sequence={sequence} />
        ))}
      </Grid>
    </SequenceWrapper>
  );
};

export default Sequences;
