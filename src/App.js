import styled from 'styled-components';
import { ErrorBoundary } from 'components/_shared';
import { default as GameModel } from './model/game';
import Game from './components/Game/Game';
import Buffer from './model/buffer/buffer';
import MatrixGenerator from 'utils/MatrixGenerator';

const GameWrapper = styled.main`
  border: 1px solid var(--primary-color);
  height: 100%;
  padding: 4%;
`;

function App() {
  const buffer = new Buffer(8);
  const matrixGenerator = new MatrixGenerator(8,5,5);
  matrixGenerator.generate();
  const sequences = matrixGenerator.getSequences();
  const matrix = matrixGenerator.getMatrix();
  const game = new GameModel(buffer, sequences, matrix);

  return (
    <ErrorBoundary>
      <GameWrapper>
        <Game game={game} />
      </GameWrapper>
    </ErrorBoundary>
  );
}

export default App;
