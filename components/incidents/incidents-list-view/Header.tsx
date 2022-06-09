import { incidentsListView } from "./styles/listStyles";
import navstyles from "./styles/navstyles.module.css";
import { IncidentsList } from "./IncidentsList";
import { useState } from "react";
import Link from "next/link";

import { Block, BlockProps } from "baseui/block";

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
export const IncidentsListViewHeader: React.FC = () => {
  const [page, setPage] = useState<PageType>(PageType.All);

  const container: BlockProps = {
    overrides: {
      Block: {
        style: {
          position: "fixed",
          top: "0ch",
          width: "80%",
          zIndex: "100",
          backgroundColor: "white",
          padding: "0.5rem",
        },
      },
    },
  };
  
  const content: BlockProps = {
    overrides: {
      Block: {
        style: {
          position: "relative",
          top: "150px",
          width: "100%",
          paddingLeft: "10px",
        },
      },
    },
  };
  const headerBar: BlockProps = {
    overrides: {
      Block: {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        },
      },
    },
  };
  const navbarWrapper: BlockProps = {
    overrides: {
      Block: {
        style: {
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "5px rgb(205, 203, 203) solid",
        },
      },
    },
  };

  return (
    <Block {...incidentsListView}>
      <Block {...container}>
        <Block {...headerBar}>
          <h1>Incidents</h1>
        </Block>
        <Block className={navstyles.navbarWrapper}>
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
        </Block>
      </Block>
      <Block {...content}>
        <IncidentsList pageType={page} />
      </Block>
    </Block>
  );
};
