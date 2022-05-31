import Link from "next/link";
import TicTacToe from "../../components/samar-tic-tac-toe/TicTacToe";
import styles from '../../styles/Home.module.css'


export default function TicTacToeGame() {
  return (
    <div className={styles.main} >
      <TicTacToe />
      <Link href="/">
        <button className="backHome">Go back Home</button>
      </Link>
    </div >
  );
}
