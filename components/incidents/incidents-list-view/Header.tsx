import { incidentsListView } from "./styles/listStyles";
import {
  container,
  content,
  headerBar,
  navbarWrapper,
  nav,
  divInsideNav,
  createIncidentButton,
  spanInsideNav,
  navActiveItem,
  notActiveNavItem,
} from "./styles/navStyles";
import { IncidentsList } from "./IncidentsList";
import { useState } from "react";
import Link from "next/link";

import { Block } from "baseui/block";

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
 * triggers when / is accessed
 * @returns a custom made fixed navbar with menu items and infinite scrolling
 */
export const IncidentsListViewHeader: React.FC = () => {
  const [page, setPage] = useState<PageType>(PageType.All);

  return (
    <Block {...incidentsListView}>
      <Block {...container}>
        <Block {...headerBar}>
          <h1>Incidents</h1>
        </Block>
        <Block {...navbarWrapper}>
          <Block {...nav}>
            <Block {...divInsideNav} onClick={() => setPage(PageType.All)}>
              <Block
                {...spanInsideNav}
                overrides={{
                  Block: {
                    style:
                      page === PageType.All ? navActiveItem : notActiveNavItem,
                  },
                }}
              >
                All
              </Block>
            </Block>
            <Block {...divInsideNav} onClick={() => setPage(PageType.Active)}>
              <Block
                {...spanInsideNav}
                overrides={{
                  Block: {
                    style:
                      page === PageType.Active
                        ? navActiveItem
                        : notActiveNavItem,
                  },
                }}
              >
                Active
              </Block>
            </Block>
            <Block
              {...divInsideNav}
              onClick={() => setPage(PageType.Maintenance)}
            >
              <Block
                {...spanInsideNav}
                overrides={{
                  Block: {
                    style:
                      page === PageType.Maintenance
                        ? navActiveItem
                        : notActiveNavItem,
                  },
                }}
              >
                Maintenance
              </Block>
            </Block>
            <Block
              {...divInsideNav}
              onClick={() => setPage(PageType.Scheduled)}
            >
              <Block
                {...spanInsideNav}
                overrides={{
                  Block: {
                    style:
                      page === PageType.Scheduled
                        ? navActiveItem
                        : notActiveNavItem,
                  },
                }}
              >
                Scheduled
              </Block>
            </Block>
          </Block>
          <Link href="/incident/new">
            <Block {...createIncidentButton}>Create incident</Block>
          </Link>
        </Block>
      </Block>
      <Block {...content}>
        <IncidentsList pageType={page} />
      </Block>
    </Block>
  );
};
