import { useCallback } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const StyledCell = styled.span`
  position: relative;
  display: inline-block;
  width: 60px;
  padding: 2px;
  text-transform: uppercase;
  text-align: center;
  font-size: 4rem;
  color: ${(props) => props.color};
  ${({correct}) => correct && 'color: blue;'}
  background-color: ${(props) => props.backgroundColor};

  &:after {
    ${({ highlighted }) =>
      highlighted &&
      `
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 5px double var(--active-color);
    box-shadow: 0px 0px 40px 2px #0ff;
  `}
  }

  &:hover&:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 5px double var(--active-color);
    box-shadow: 0px 0px 40px 2px #0ff;
  }
`;

const Cell = ({
  children,
  disabled,
  active,
  focused,
  completed,
  onClick,
  symbol,
  scramble,
  correct,
  ...props
}) => {
  const getColor = useCallback(() => {
    if (disabled) {
      return 'var(--disabled-color-dark)';
    }

    return 'var(--primary-color)';
  }, [disabled]);
  
  const getBackgroundColor = useCallback(() => {
    if (completed) {
      return 'var(--success-color)';
    } else if (active) {
      return 'var(--active-background-color)';
    } else if (focused) {
      return 'var(--primary-color-transparent)';
    }

    return 'initial';
  }, [completed, active, focused]);
  
  return (
    <StyledCell
      color={getColor}
      backgroundColor={getBackgroundColor}
      isDisabled={disabled}
      onClick={disabled || !active ? null : onClick}
      correct={correct}
      {...props}
    >
      {scramble ? scramble : (disabled ? '[ ]' : symbol)}
    </StyledCell>
  );
};

export default observer(Cell);
