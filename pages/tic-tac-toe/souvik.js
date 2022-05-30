import Game from "../../components/souvik/Game";
import Link from "next/link";
import styles from "../../styles/Souvik.module.css"

export default function Souvik(){
  return (
  <>
    <Game/>
    <Link href = "/"><button className = {styles.backButton} >Go back to Home Page</button></Link>
  </>
  );
}