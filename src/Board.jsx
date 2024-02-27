import "./Board.css"
import Square from "./Square"
import calculateWinner from "./calculateWinner"

export default function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares)
  let status

  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`
  }

  function handleClick(i) {
    const nextSquares = squares.slice()

    if (squares[i] || calculateWinner(squares)) {
      return
    }

    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }

    onPlay(nextSquares)
  }

  const makeSquares = () => {
    let rows = []
    for (let i = 0; i < 3; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(
          <Square
            key={i * 3 + j}
            value={squares[i * 3 + j]}
            onSquareClick={() => handleClick(i * 3 + j)}
          />
        )
      }
      rows.push(<div key={i}>{row}</div>)
    }
    return rows
  }

  return (
    <div className="board">
      <div className="status">{status}</div>
      {makeSquares()}
    </div>
  )
}
