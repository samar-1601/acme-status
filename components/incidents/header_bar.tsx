import styles from "./styles.module.css"

export const HeaderBar:React.FC = ()=>{
    return(
        <div className={styles.headerBar}>
            <h1>Incidents</h1>
        </div>
    )
}