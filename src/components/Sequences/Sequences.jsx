import Sequence from './Sequence';
import { Grid } from 'components/_shared';

const Sequences = ({ sequences }) => {
  return (
    <Grid direction='column'>
      {sequences.map((sequence) => (
        <Sequence sequence={sequence} />
      ))}
    </Grid>
  );
};

export default Sequences;
