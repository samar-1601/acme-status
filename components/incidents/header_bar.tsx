import styles from "./styles.module.css"
import { generateUsers } from "./populateData"

export const HeaderBar:React.FC = ()=>{
    return(
        <div className={styles.headerBar}>
            <h1>Incidents</h1>
            <button onClick={generateUsers}>Populate Data</button>
        </div>
    )
}