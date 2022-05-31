import { Square } from "./square";
import React, { ReactElement } from "react";
import styles from "./style.module.css";

interface Props{
  toggle: (idx:number)=> any, 
  squares: string[], 
  winners: number[]
}

export const Board : React.FC<Props> = ({ toggle, squares, winners })=> {
  
  // calls the toogle function passed from the board as a prop so that we can 
  // keep account of the progress directly through the parent i.e board
  const togglePlayer = (index:number) => {
      toggle(index);
    };

  // function which generates the square for the board
  const renderSquare = (i:number) => {
    // if this index is a winning index then we will pass a winner string
    // to modify the class of this square for CSS styling
    if(winners && winners.includes(i))
      return <Square winners ="winner" index={i} player={squares[i]} toggleButton={togglePlayer} />;
    
    // else render a normal square
    return <Square winners="" index={i} player={squares[i]} toggleButton={togglePlayer} />;
  };
  
  // implementing the creation of Board using 2 fro loops rather than hardcoded
  // renderSquare methods;

  let board:ReactElement[] = []; // array of react elements
  
  // interate 3x3 = 9 times for building the board
  for(let i = 0; i<3; i++)
  {
    let boardRow:ReactElement[] = []; // temporary row array
    for(let j = 0; j<3; j++)
    {
      let index = i*3 + j;
      boardRow.push(renderSquare(index)); // store the 3 row-squares 1 by 1
    }
    // create a wrapper element for the row and give the required classes
    let boardRowElement:ReactElement = <div key={i} className={styles.boardRow}>{boardRow}</div>
    
    // add this generated row to the Board
    board.push(boardRowElement);
  }

  return (
    <div className={styles.board}>
      {board}
    </div>
  );
}
