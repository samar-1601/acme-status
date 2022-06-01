import styles from "./styles.module.css"

export const OpenListView = ()=>{
    return(
        <div className={styles.listItem}>
            <div className={styles.listDetails}>
                <span className={styles.itemName}>Name</span>
                <span className={styles.itemStatus}>Status</span>
                <span className={styles.itemDate}>8 DAYS AGO</span>
            </div>
        </div>
    )
}