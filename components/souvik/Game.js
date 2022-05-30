import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from "../../styles/Home.module.css"

function Square(props) {
    if(props.winningSquares === "no"){
      return (
        <button className={styles.square} onClick={() => {props.onClick()}}>
          {
            props.value
          }
        </button>
      );
    }
    else{
        return (
            <button className={styles.squarewin} onClick={() => {props.onClick()}}>
              {
                props.value
              }
            </button>
          );
    }
  }
  
  class Board extends React.Component {
    // handleClick(i){
    //     const squares = this.props.squares.slice();
    //     if(calculateWinner(squares) || squares[i]){
    //         return;
    //     }
    //     squares[i] = (this.props.xIsNext ? "X":"O");
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.state.xIsNext
    //     });
    // }

    renderSquare(i, is) {
    if(is === 0){
      return (
        <Square  
         key = {i}
         value = {this.props.squares[i]} 
         onClick = {() => {this.props.onClick(i);}}
         winningSquares = "no"
        />
      );
    }
    else{
        return (
            <Square  
         key = {i}
         value = {this.props.squares[i]} 
         onClick = {() => {this.props.onClick(i);}}
         winningSquares = "yes"
        />
        );
    }
    }
  
    render() {
    //   const winner = calculateWinner(this.state.squares);
        // console.log(this.props.winningSquares);
        let ob = [];
        for(let i=0;i<3;i++){
            let temp = [];
            for(let j = 0;j<3;j++){
                if(this.props.winningSquares == null)
                    temp.push(this.renderSquare(i * 3 + j, 0));
                else if(this.props.winningSquares[0] === i*3 + j || this.props.winningSquares[1] === i*3 + j || this.props.winningSquares[2] === i*3 + j){
                    temp.push(this.renderSquare(i*3+j,1));
                }
                else{
                    temp.push(this.renderSquare(i*3+j,0));
                }
            }
            let obj = (<div className = {styles.boardrow} key = {i}>{temp}</div>);
            ob.push(obj);
        }
        const ret = (<div>{ob}</div>);
      return (
        // <div>
        //   {/* <div className="status">{status}</div> */}
        //   <div className="board-row">
        //     {this.renderSquare(0)}
        //     {this.renderSquare(1)}
        //     {this.renderSquare(2)}
        //   </div>
        //   <div className="board-row">
        //     {this.renderSquare(3)}
        //     {this.renderSquare(4)}
        //     {this.renderSquare(5)}
        //   </div>
        //   <div className="board-row">
        //     {this.renderSquare(6)}
        //     {this.renderSquare(7)}
        //     {this.renderSquare(8)}
        //   </div>
        // </div>
        ret
      );
    }
  }
  
  export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                rowMove: null,
                colMove: null
            }],
            xIsNext: true,
            stepNumber: 0,
            isAscending: true,
            winningSquares: Array(3).fill(null)
        }
    }

    jumpTo(step){
        const squares = this.state.history[step].squares;
        const winningSquares = calculateWinningSquares(squares);
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            winningSquares: winningSquares
        });
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        // console.log(i);
        const rowMove = Math.floor(Number(i) / 3);
        const colMove = Number(i) % 3;
        // console.log(rowMove);
        // console.log(colMove);

        // const squares = this.props.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = (this.state.xIsNext ? "X":"O");
        // const winningSquares = calculateWinningSquares(squares);
        // console.log(winningSquares);
        this.setState({
            history: history.concat([{
                squares: squares,
                rowMove: rowMove,
                colMove: colMove,
            }]),
            stepNumber : history.length,
            xIsNext: !this.state.xIsNext,
            winningSquares: calculateWinningSquares(squares)
        });
    }

    handleOrder(){
        this.setState({isAscending: !this.state.isAscending});
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const isAscending = this.state.isAscending;
      const winningSquares = this.state.winningSquares;
      console.log(winningSquares);

      const moves = history.map((step, move) => {
          const desc = move ? 
          'Go to move #' + move + " Row:" + step.rowMove + " Column:" +  step.colMove:
          'Go to game start';
          if(move === this.state.stepNumber){
            return (
                <li key = {move}>
                    <button onClick={() => {this.jumpTo(move)}}><strong>{desc}</strong></button>
                </li>
            );
          }
          else{
            return (
                <li key = {move}>
                    <button onClick={() => {this.jumpTo(move)}}>{desc}</button>
                </li>
            );
          }
      });
      if(!isAscending){
          moves.reverse();
      }
      let status;
      if(winner){
          status = "Winner " + winner;
      }
      else if(this.state.stepNumber === 9){
        status = "Game Drawn";
      }
      else{
        status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
      }

      return (
        <div className={styles.game}>
          <div className={styles.gameboard}>
            <Board 
                squares = {current.squares}
                onClick = {(i) => {this.handleClick(i)}}
                winningSquares = {winningSquares}
            />
          </div>
          <div className={styles.gameinfo}>
            <div>{ status }</div>
            <button onClick={() => {this.handleOrder();}}>{isAscending ? "Ascending ":"Descending "} Moves</button>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
//   const root = ReactDOM.createRoot(document.createElement("root"));
//   root.render(<Game />);

  function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function calculateWinningSquares(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }
    return null;
  }
  