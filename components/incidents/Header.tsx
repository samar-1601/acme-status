import styles from "./styles/styles.module.css";
import navstyles from "./styles/navstyles.module.css";
import { IncidentsList } from "./IncidentsList";
import { useState } from "react";
import Link from "next/link";

/**
 * PageType
 * defines the page to show on screen based on navbar menu selected
 * @type {enum}
 */
export enum PageType {
  All = "All",
  Active = "Active",
  Maintenance = "Maintenance",
  Scheduled = "Scheduled",
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
        </div>
        <div className={navstyles.navbarWrapper}>
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
              <span
                className={page === PageType.Maintenance ? navstyles.l1 : ""}
              >
                Maintenance
              </span>
            </div>
            <div onClick={() => setPage(PageType.Scheduled)}>
              <span className={page === PageType.Scheduled ? navstyles.l1 : ""}>
                Scheduled
              </span>
            </div>
          </nav>
          <div className={navstyles.createIncidentButton}>
            <Link href="/incident/new">
              <button>Create incident</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={navstyles.content}>
        <IncidentsList pageType={page} />
      </div>
    </div>
  );
};
