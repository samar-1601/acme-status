import ImprovedGame from "../../components/souvik/ImprovedGame";
import Link from "next/link";
import styles from "../../styles/Souvik.module.css"

export default function Souvik(){
  return (
  <>
    <ImprovedGame/>
    <Link href = "/"><button className = {styles.backButton} >Go back to Home Page</button></Link>
  </>
  );
}