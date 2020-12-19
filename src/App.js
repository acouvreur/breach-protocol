import { default as GameModel } from './model/game';
import Game from './components/Game/Game';
import Buffer from './model/buffer/buffer';

function App() {
  const buffer = new Buffer(8);
  const sequences = [
    ['55', '1C'],
    ['1C', '1C', 'E9'],
    ['BD', 'E9', '55'],
  ];
  const matrix = [
    ['1C', 'E9', '1C', '55', '1C'],
    ['E9', '55', '1C', '1C', 'BD'],
    ['55', 'BD', '1C', 'BD', '55'],
    ['55', '1C', '55', '55', '1C'],
    ['E9', '1C', '1C', '1C', '55'],
  ];
  const game = new GameModel(buffer, sequences, matrix);

  return <Game game={game} />;
}

export default App;
