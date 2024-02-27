import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import Board from "./Board"
import { useState } from "react"

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [ascending, setAscending] = useState(true)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  function toggleSort() {
    setAscending(!ascending)
  }

  const moves = history.map((squares, move) => {
    let description

    if (move > 0) {
      description = `Go to move #${move}`
    } else {
      description = "Go to game start"
    }

    if (move === currentMove && move > 0) {
      description = `You are at move #${move}`
    }

    return (
      <li key={move}>
        {move === currentMove ? (
          <div className="currentDescr">{description}</div>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    )
  })

  if (!ascending) {
    moves.reverse()
  }

  return (
    <>
      <h1>Tic-Tac-Toe</h1>

      <div className="ttt">
        <div>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="history">
          <button className="toggle" onClick={toggleSort}>
            {ascending ? "Ascending" : "Descending"}
          </button>
          <ul>{moves}</ul>
        </div>
      </div>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  )
}

export default App
