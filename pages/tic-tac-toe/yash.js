import Link from "next/link";
import App from "../../components/yash-tic-tac-toe/App";
import styles from "../../styles/Home.module.css";

export default function TicTacToeGame() {
  return (
    <div className={styles.main}>
      <App />
      <Link href="/">
        <button className="backHome">Go back Home</button>
      </Link>
    </div>
  );
}
