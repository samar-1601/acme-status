import { Square } from "./square";
import styles from "./style.module.css";

export function Board({ toggle, squares, winners }) {
    const togglePlayer = (index) => {
      toggle(index);
    };
    console.log("square recieved in board : " +  squares);

  const renderSquare = (i) => {
    if(winners && winners.includes(i))
      return <Square winners ="winner" index={i} player={squares[i]} toggleButton={togglePlayer} />;
    return <Square winners="" index={i} player={squares[i]} toggleButton={togglePlayer} />;
  };
  
  let board = [];
  for(let i = 0; i<3; i++)
  {
    let boardRow = [];
    for(let j = 0; j<3; j++)
    {
      let index = i*3 + j;
      boardRow.push(renderSquare(index));
    }
    let boardRowElement = <div key={i} className={styles.boardRow}>{boardRow}</div>
    board.push(boardRowElement);
  }

  return (
    <div className={styles.board}>
      {board}
    </div>
  );
}
