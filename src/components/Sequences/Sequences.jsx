import Buffer from '../Buffer/Buffer';
import { Grid } from 'components/_shared';

const Sequences = ({ sequences }) => {
  return (
    <Grid direction='column'>
      {sequences.map((sequence) => (
        <Buffer capacity={sequence.length} values={sequence} />
      ))}
    </Grid>
  );
};

export default Sequences;
