import * as React from "react"
import styles from "./styles.module.css"

export const Header = function () {
    return (
        <div className={styles.header}>
            <div className={styles.heading}>
                Add component
            </div>
            <div className={styles.goback}>
                <a href="/components">Back to components</a>
            </div>
        </div>
    );
}