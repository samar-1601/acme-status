import styles from "./styles/styles.module.css";
import navstyles from "./styles/navstyles.module.css";
import { OpenListView } from "./open_list_view";
import { generateUsers } from "./populateData";
import { useState } from "react";

/**
 * PageType
 * defines the page to show on screen based on navbar menu selected
 * @type {enum}
 */
export enum PageType {
  All = "All",
  Active = "Active",
  Maintenance = "Maintenance",
}

/**
 * IncidentsList View
 * triggered when /incidents is accessed
 * @returns a custom made fixed navbar with menu items and infinite scrolling 
 */
export const IncidentsListView: React.FC = () => {
  const [page, setPage] = useState<PageType>(PageType.All);

  return (
    <div className={styles.incidentsListView}>
      <div className={navstyles.container}>
        <div className={navstyles.headerBar}>
          <h1>Incidents</h1>
          <button onClick={generateUsers}>Populate Data</button>
        </div>
        <nav className={navstyles.nav}>
          <div onClick={() => setPage(PageType.All)}>
            <span className={page === PageType.All ? navstyles.l1 : ""}>
              All
            </span>
          </div>
          <div onClick={() => setPage(PageType.Active)}>
            <span className={page === PageType.Active ? navstyles.l1 : ""}>
              Active
            </span>
          </div>
          <div onClick={() => setPage(PageType.Maintenance)}>
            <span className={page === PageType.Maintenance ? navstyles.l1 : ""}>
              Maintenance
            </span>
          </div>
        </nav>
      </div>
      <div className={navstyles.content}>
        <OpenListView pageType={page} />
      </div>
    </div>
  );
};
