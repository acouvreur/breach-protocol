import styled from 'styled-components';
import PropTypes from 'prop-types';

const Grid = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  flex-wrap: ${(props) => props.wrap};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};

  & > *:not(:last-child) {
    margin-bottom: ${(props) => `${props.spacing}rem`};
    margin-right: ${(props) => `${props.spacing}rem`};
  }
`;

Grid.propTypes = {
  direction: PropTypes.string,
  wrap: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  spacing: PropTypes.number,
};

Grid.defaultProps = {
  direction: 'row',
  wrap: 'nowrap',
  justify: 'flex-start',
  align: 'flex-start',
  spacing: 0,
};

export default Grid;
