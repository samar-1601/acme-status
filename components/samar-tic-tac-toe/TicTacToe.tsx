import { Board } from "./board";
import { useState } from "react";
import { CalculateWinner } from "./calculateWinner";
import styles from "./style.module.css";

export let winner: string = ""; // variable to store the winner 'X' or 'O'
let winning_cells: number[] = []; // list of numbers storing the combination for the winning player

interface historyInterface {
  squares: string[];
  row: string;
  col: string;
}

let history:historyInterface[] = [
  {
    squares: Array(9).fill(null),
    row: "",
    col: "",
  },
];

// contains the history in terms of array of squre values at each step
let stepNumber: number = 0; // counter for storing the steps taken in game
let status: string; // stores status of the game

// temporary array to store the current state or the current value held by each of the 9 squares
let squares: string[] = Array(9).fill("");

// fill the history with empty values before the game starts

function TicTacToe() {
  // player state
  const [player, setPlayer] = useState<string>("X");
  const [ascending, setAscending] = useState<boolean>(true);
  // grid state stored in squareValues
  const [squareValues, setSquareValues] = useState<string[]>(squares);

  // This Function updates the history list based on game stage
  const updateHistory = () => {
    history = history.slice(0, stepNumber + 1);
    // store the last game stage(i.e the current) in the squares array
    const current = history[history.length - 1];
    squares = current.squares.slice();
  };

  // Function to Toggle the player and update the related variables
  const togglePlayer = (index: number) => {
    updateHistory();

    // update the latest squares array with the box value clicked by the player
    squares[index] = player;

    // update the history list
    history = history.concat([
      {
        squares: squares,
        row: String(Math.floor(index / 3)),
        col: String(index % 3),
      },
    ]);

    // No. of steps taken in game is updated
    stepNumber = history.length;

    // Check for a winner
    [winner, winning_cells] = CalculateWinner(squares);

    // update the square-list for the latest grid
    setSquareValues(squares);

    // update the player who's turn has come according to the game stage
    if (stepNumber % 2 !== 0) setPlayer("X");
    else setPlayer("O");
  };

  // Function to Jump to a new state of the Game based on the history
  // level clicked
  const jumpTo = (step: number) => {
    console.log("step : " + step);
    console.log("stepNumber : " + stepNumber);

    if (step === history.length - 1) return;

    stepNumber = step;
    // update the history to execute this jump
    updateHistory();

    // whenever we go to a previous game stage, the winner is again null.
    winner = "";
    winning_cells = [];
    setSquareValues(squares);

    if (stepNumber % 2 === 0) setPlayer("X");
    else setPlayer("O");

    console.log("player : " + player);
    console.log(`square : ${squares}`);
  };

  // Update the moves list according to the history
  const moves = history.map((step, move) => {
    // decide the text for the status
    const desc = move
      ? "Go to move #" + move + `(${step.row}, ${step.col})`
      : "Go to game start";
    return (
      <li key={move}>
        <button className={styles.historyButton} onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  // changing the order of moves based on ascending or descending
  if (!ascending) moves.reverse();
  // toggling the ascending/ descending feature
  const toggleAscending = () => {
    setAscending(!ascending);
  };

  // Update the status of game
  if (!winner && moves.length === 10) {
    status = "DRAW";
  } else if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + player;
  }

  return (
    <div className={styles.game}>
      <div className={styles.gameBoard}>
        <Board
          squares={squareValues}
          toggle={togglePlayer}
          winners={winning_cells}
        />
      </div>
      <div className={styles.gameInfo}>
        <div>{status}</div>
        <button onClick={() => toggleAscending()}>
          {ascending ? "Ascending" : "Descending"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default TicTacToe;
