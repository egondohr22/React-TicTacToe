import { useState } from "react";
import Board from "./components/board";
import "./styles.css";

export default function Game() {
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [indexHistory, setIndexHistory] = useState([]);
  const [sortAscending, setSortAscending] = useState(true)
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    let index = indexHistory[move]
    description = "Go to move #" + move + ` X: ${Math.floor(index / 3) + 1} Y: ${index % 3 + 1}`;

    return (
      <li key={move}>
        {move === currentMove ? (
          <span>You are at move #{move}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  if (!sortAscending) {
    moves.reverse()
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} indexHistory={indexHistory} setIndexHistory={setIndexHistory} currentMove={currentMove} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
        <ol>
          <button onClick={() => setSortAscending(!sortAscending)}>
            Toggle Sort ({sortAscending ? 'Descending' : 'Ascending'})
          </button>
        </ol>
      </div>
    </div>
  );
}
