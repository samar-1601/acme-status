import styles from "./style.module.css";
import { winner } from "./TicTacToe";

export function Square({index, player, toggleButton, winners}) {
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
    <button id = {index} className={`${styles.square} ${winners?styles.winner:""}`} onClick = {()=>update()}>
      {player}
    </button>
  );
}
