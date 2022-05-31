import styles from "./style.module.css";
import { winner } from "./TicTacToe";
import React from "react";

interface Props {
  squareIndex: number;
  player: string;
  toggleButton: (idx: number) => any;
  winners: string;
}

export const Square: React.FC<Props> = ({
  squareIndex,
  player,
  toggleButton,
  winners,
}) => {
  // function for callling the parent to let it know that this square has been clicked
  // and update the board status
  const update = (): void => {
    // if winner has been decided or this box was already checked, don't mark it again
    if (!player && !winner) {
      toggleButton(squareIndex);
    }
  };
  const square = "square";
  return (
    <button
      className={`${styles.square} ${winners ? styles.winner : ""}`}
      onClick={() => update()}
    >
      {player}
    </button>
  );
};
