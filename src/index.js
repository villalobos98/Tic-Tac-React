import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button
      className="square"
      onClick={() => {
        props.onClick();
      }}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          if (this.props.winner) {
            const [a,b,c,d] = this.props.winningLine;
            const winningSquare1 = document.getElementsByClassName("square")[a];
            const winningSquare2 = document.getElementsByClassName("square")[b];
            const winningSquare3 = document.getElementsByClassName("square")[c];
            const winningSquare4 = document.getElementsByClassName("square")[d];

            winningSquare1.style.backgroundColor = 'Yellow';
            winningSquare2.style.backgroundColor = 'Yellow';
            winningSquare3.style.backgroundColor = 'Yellow';
            winningSquare4.style.backgroundColor = 'Yellow';
            return;
          }
          this.props.onClick(i);
          const xColor = "lightblue";
          const oColor = "lightgreen";
          const squareButton = document.getElementsByClassName("square")[i];


          this.props.xIsNext
            ? (squareButton.style.backgroundColor = xColor)
            : (squareButton.style.backgroundColor = oColor);

        }}
        squareIndex={i}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {Array(4)
            .fill(null)
            .map((_, i) => {
              const row = Array(4)
                .fill(null)
                .map((_, j) => this.renderSquare(4 * i + j));
              return (
                <div key={i} className="board-row">
                  {row}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(16).fill(null),
        },
      ],
      xIsNext: true,
    };
  }
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();


    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      winner: !!calculateWinner(squares),
      xIsNext: !this.state.xIsNext,
      history: history.concat([{ squares: squares }]),
    });
  }
  render() {
    const history = this.state.history;
    const current = this.state.history[history.length - 1];
    const winner = !!calculateWinner(current.squares);
    let status;
    if (winner) {
      status = "Winner: " + (this.state.xIsNext ? "O" : "X");
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
              <Board
                xIsNext={this.state.xIsNext}
                winner={winner}
                winningLine={calculateWinner(current.squares)}
                squares={current.squares}
                onClick={(i) => {
                  this.handleClick(i);
                }}
              />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    // This is all the horizontals
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    // This is all the diagonals
    [0, 5, 10, 15],
    [3, 6, 9, 12],
    // This is all the verticals
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d]
    ) {
      return lines[i];
    }
  }
  return null;
}
