import React, { useState } from "react";
import { isUndefined } from "util";
import styles from "../../styles/style.module.css";

const getWinner = function (squares: string[]) {
  let lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let gameStatus: game = {};
  for (let i: number = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      gameStatus = {
        winner: squares[a],
        line: lines[i],
      };
    }
  }
  return gameStatus;
};

interface game {
  winner?: string;
  line?: number[];
}

interface squareStatus {
  value: string;
  win: boolean;
  onClick: (params: any) => any;
}

const Square = function (props: squareStatus) {
  if (props.win) {
    return (
      <button className={styles.squareWin} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  return (
    <button className={styles.square} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

const Game = function () {
  const [value, setValue] = useState("X");
  const [history, setHistory] = useState([
    { squares: Array(9).fill(""), win: [-1, -1, -1] },
  ]);
  const [current, setCurrent] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);
  const [present, setPresent] = useState(Array(9).fill(""));

  let tmpPresent: string[] = present.slice();
  let rows = [];
  let gameStatus = getWinner(tmpPresent);

  for (let i = 0; i < 3; i++) {
    let squares = [];
    for (let j = 0; j < 3; j++) {
      squares[j] = (
        <Square
          key={3 * i + j}
          value={tmpPresent[3 * i + j]}
          win={
            !isUndefined(gameStatus.line) &&
            gameStatus.line.indexOf(3 * i + j) > -1
          }
          onClick={() => {
            if (gameStatus.winner || tmpPresent[3 * i + j]) return;
            tmpPresent[3 * i + j] = value;
            setPresent(tmpPresent);
            setCurrent(current + 1);
            setMaxSteps(current + 1);
            let tmpHistory = history.slice();
            tmpHistory[current + 1] = {
              squares: tmpPresent,
              win: [-1, -1, -1],
            };
            setHistory(tmpHistory);
            setValue(value === "X" ? "O" : "X");
          }}
        />
      );
    }
    rows[i] = (
      <div className={styles.row} key={i}>
        {squares}
      </div>
    );
  }

  let status = "Game start";
  let lists = [];

  for (let i = 0; i <= maxSteps; i++) {
    lists[i] = (
      <li key={i}>
        <button
          className={styles.step}
          onClick={() => {
            setValue(i & 1 ? "O" : "X");
            setPresent(history[i].squares);
            setCurrent(i);
          }}
        >
          {status}
        </button>
      </li>
    );
    status = "Go to step " + String(i + 1);
  }

  status = "Next Player: " + value;
  if (gameStatus.winner) status = "Winner: " + gameStatus.winner;
  else if (current === 9) status = "Game drawn!";

  return (
    <div className={styles.AppContent}>
      <div className={styles.status}>{status}</div>
      <div className={styles.board}>{rows}</div>
      <div className={styles.history}>
        <ol>{lists}</ol>
      </div>
    </div>
  );
};

class App extends React.Component {
  render() {
    return <Game />;
  }
}

export default App;
