import React, { useState } from 'react';
import styles from "../../styles/Souvik.module.css"

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
  
  function Board(props) {
    const renderSquare = (i, is) => {
        if(is === 0){
        return (
            <Square  
            key = {i}
            value = {props.squares[i]} 
            onClick = {() => {props.onClick(i);}}
            winningSquares = "no"
            />
        );
        }
        else{
            return (
                <Square  
            key = {i}
            value = {props.squares[i]} 
            onClick = {() => {props.onClick(i);}}
            winningSquares = "yes"
            />
            );
        }
    }
        let ob = [];
        for(let i=0;i<3;i++){
            let temp = [];
            for(let j = 0;j<3;j++){
                if(props.winningSquares == null)
                    temp.push(renderSquare(i * 3 + j, 0));
                else if(props.winningSquares[0] === i*3 + j || props.winningSquares[1] === i*3 + j || props.winningSquares[2] === i*3 + j){
                    temp.push(renderSquare(i*3+j,1));
                }
                else{
                    temp.push(renderSquare(i*3+j,0));
                }
            }
            let obj = (<div className = {styles.boardrow} key = {i}>{temp}</div>);
            ob.push(obj);
        }
        const ret = (<div>{ob}</div>);
      return (
        ret
      );
    }
  
  export default function Game() {
    const [xIsNext, setxIsNext] = useState(true);
    const [isAscending, setisAscending] = useState(true);
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
        rowMove: null,
        colMove: null
    }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [winningSquares, setwinningSquares] = useState(Array(3).fill(null));

    const jumpTo = (step) => {
        const squares = history[step].squares;
        const {winningSquares, winner} = calculateWinningSquares(squares);
        setStepNumber(step);
        setxIsNext((step%2)===0);
        setwinningSquares(winningSquares);
    }

    const handleClick = (i) => {
        const nhistory = history.slice(0, stepNumber + 1);
        const current = nhistory[nhistory.length - 1];
        const squares = current.squares.slice();
        const rowMove = Math.floor(Number(i) / 3);
        const colMove = Number(i) % 3;
        if(calculateWinningSquares(squares).winner || squares[i]){
            return;
        }
        squares[i] = (xIsNext ? "X":"O");
        setHistory(nhistory.concat([{
            squares: squares,
            rowMove: rowMove,
            colMove: colMove
        }]));
        setStepNumber(nhistory.length);
        setxIsNext(!xIsNext);
        setwinningSquares(calculateWinningSquares(squares).winningSquares);
    }

    const handleOrder = () => {
        setisAscending(!isAscending);
    }
      const current = history[stepNumber];
      const {ignore, winner} = calculateWinningSquares(current.squares);

      const moves = history.map((step, move) => {
          const desc = move ? 
          'Go to move #' + move + " Row:" + step.rowMove + " Column:" +  step.colMove:
          'Go to game start';
          if(move === stepNumber){
            return (
                <li key = {move}>
                    <button onClick={() => {jumpTo(move)}}><strong>{desc}</strong></button>
                </li>
            );
          }
          else{
            return (
                <li key = {move}>
                    <button onClick={() => {jumpTo(move)}}>{desc}</button>
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
      else if(stepNumber === 9){
        status = "Game Drawn";
      }
      else{
        status = 'Next player: ' + (xIsNext ? "X" : "O");
      }

      return (
        <div className={styles.game}>
          <div className={styles.gameboard}>
            <Board 
                squares = {current.squares}
                onClick = {(i) => {handleClick(i)}}
                winningSquares = {winningSquares}
            />
          </div>
          <div className={styles.gameinfo}>
            <div>{ status }</div>
            <button onClick={() => {handleOrder();}}>{isAscending ? "Ascending ":"Descending "} Moves</button>
            <ol>{moves}</ol>
          </div>
        </div>
      );
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
        return {winningSquares: lines[i], winner: squares[a]};
      }
    }
    return {winningSquares: null, winner: null};
  }
  