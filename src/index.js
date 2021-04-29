import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return (
        <button className="square"
                onClick={() => {props.onClick()}}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onClick={() => {this.props.onClick(i)
                if(this.props.winner){
                    return;
                }
                if(this.props.xIsNext){
                    document.getElementsByClassName('square')[i].style.backgroundColor="lightblue";
                }else{
                    document.getElementsByClassName('square')[i].style.backgroundColor="lightgreen";

                }
            }}
            squareIndex = {i}
        />;
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                </div>
                <div className="board-row">
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                </div>
                <div className="board-row">
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}
                </div>
            </div>
        );
    }


}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(16).fill(null),
            }],
            xIsNext: true,
        }
    }
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        //If there is a winner stop playing the game
        if(this.state.winner){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState(
            {
                winner: !!calculateWinner(squares),
                xIsNext: !this.state.xIsNext,
                history: history.concat(
                        [{squares: squares}]),
                });
    }
    render() {
        const history = this.state.history;
        const current = this.state.history[history.length - 1];
        const winner = !!calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + (this.state.xIsNext ? "O": "X");
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        xIsNext = {this.state.xIsNext}
                        winner = {winner}
                        squares ={current.squares}
                        onClick = {(i) => {this.handleClick(i);}}
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

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        // This is all the horizontals
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        // This is all the diagonals
        [0, 4, 8, 12],
        [0, 5, 10, 15],
        // This is all the verticals
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
            return squares[a];
        }
    }
    return null;
}

