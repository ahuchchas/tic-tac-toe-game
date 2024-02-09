/* eslint-disable react/prop-types */
import { useState } from "react";

function Square({ value, handleSquareClick }) {
  return (
    <button
      className="bg-white border border-gray-500 h-12 w-12 m-1 text-lg"
      onClick={handleSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, handlePlay }) {
  const winner = getWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next move for: ${xIsNext ? "X" : "O"}`;
  }

  function handleSquareClick(index) {
    if (squares[index] || getWinner(squares)) {
      return;
    }
    const newSquares = [...squares];
    if (xIsNext) {
      newSquares[index] = "X";
    } else {
      newSquares[index] = "O";
    }

    handlePlay(newSquares);
  }
  return (
    <div>
      <div className="font-semibold m-1">{status}</div>
      <div className="flex">
        <Square
          value={squares[0]}
          handleSquareClick={() => handleSquareClick(0)}
        />
        <Square
          value={squares[1]}
          handleSquareClick={() => handleSquareClick(1)}
        />
        <Square
          value={squares[2]}
          handleSquareClick={() => handleSquareClick(2)}
        />
      </div>

      <div className="flex">
        <Square
          value={squares[3]}
          handleSquareClick={() => handleSquareClick(3)}
        />
        <Square
          value={squares[4]}
          handleSquareClick={() => handleSquareClick(4)}
        />
        <Square
          value={squares[5]}
          handleSquareClick={() => handleSquareClick(5)}
        />
      </div>

      <div className="flex">
        <Square
          value={squares[6]}
          handleSquareClick={() => handleSquareClick(6)}
        />
        <Square
          value={squares[7]}
          handleSquareClick={() => handleSquareClick(7)}
        />
        <Square
          value={squares[8]}
          handleSquareClick={() => handleSquareClick(8)}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(newSquares) {
    setXIsNext(!xIsNext);
    const newHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    move % 2 === 0 ? setXIsNext(true) : setXIsNext(false);
  }

  const moves = history.map((squares, index) => {
    let description;
    if (index > 0) {
      description = "Go to move #" + index;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={index} className=" bg-teal-900 text-white m-1 px-2 rounded">
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    );
  });
  return (
    <>
      <h2 className="my-12 ml-12 text-center text-3xl font-bold">
        TIC TAC TOE
      </h2>

      <div className="flex justify-center">
        <div className="pr-12 border-r-2">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            handlePlay={handlePlay}
          />
        </div>
        <div className="ml-12">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

function getWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
