import styles from "./style.module.css";
import { winner } from "./TicTacToe";
import React from "react";

interface Props{
  index: number, 
  player: string, 
  toggleButton: (idx:number)=> any, 
  winners: string
}

export const Square : React.FC<Props> = ({index, player, toggleButton, winners}) => {
    const update = () => {
    // if winner has been decided or this box was already checked, don't mark it again
    if(!player &&  !winner)
    {
      console.log(index);
      toggleButton(index);
    }
  };
  const square  = "square";
  return (
    <button id = {String(index)} className={`${styles.square} ${winners?styles.winner:""}`} onClick = {()=>update()}>
      {player}
    </button>
  );
}
