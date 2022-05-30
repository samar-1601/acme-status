import Link from "next/link";
import TicTacToe from "../../components/samar-tic-tac-toe/TicTacToe";

export default function TicTacToeGame() {
  return (
    <>
      <TicTacToe />
      <Link href="/" > Go back Home</Link>
    </>
  );
}
