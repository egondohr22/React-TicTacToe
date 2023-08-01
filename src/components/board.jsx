import Square from "./square";
import { useState } from "react";


export default function Board({ xIsNext, squares, onPlay, indexHistory, setIndexHistory, currentMove }) {

  const winner = calculateWinner(squares, currentMove)
  console.log("das")
  console.log(winner)
  let gameStatus
  if (winner) {
    gameStatus = "Winner: " + winner
  } else if (currentMove > 8){
    gameStatus = "DRAW"
  }
  else {
    gameStatus = "Next player: " + (xIsNext ? "X" : "O")
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = [...squares]
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    let index = indexHistory
    index[currentMove] = i
    console.log(index)
    setIndexHistory(index);
    onPlay(nextSquares);
  }

  function makeBoard() {
    const board = []
    for(let i = 0; i < 3; i++) {
      const row = []
      for(let j = 0; j < 3; j++) {
        let index = i * 3 + j

        row.push(
          <Square key = {index} value = {squares[index]} click = {()=> handleClick(index)}></Square>
        )
      }
      board.push(
        <div className="board-row" key={i}>
          {row}
        </div>
      )
    }
    return board
  }

  return <>
    <div className="status">{gameStatus}</div>
    {makeBoard()}
  </>;
}

function calculateWinner(squares, currentMove) {

  const xIsNext = currentMove % 2 === 0;

  // return null;
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      let message = xIsNext? '0' : 'X'
      squares[a] = squares[b] = squares[c] = '-'
      console.log(message)
      return message;
    }
  }
  return null;
}