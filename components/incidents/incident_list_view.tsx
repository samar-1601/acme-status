import { HeaderTabs } from "./header_tabs"
import { HeaderBar } from "./header_bar"
import styles from "./styles.module.css"

export const IncidentsListView:React.FC = () => {
    return <div className={styles.incidentsListView}>
        <HeaderBar/>
        <HeaderTabs/>
    </div>
}