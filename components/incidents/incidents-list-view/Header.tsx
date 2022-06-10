// lib
import { useState } from "react";
import Link from "next/link";

// components
import { NavBarMenuItem } from "./navBarMenuItem";
import { IncidentsList } from "./IncidentsList";
import { Block } from "baseui/block";

// constants
import { PageType } from "../../../constants";

// styles
import { incidentsListView } from "./styles/listStyles";
import {
  container,
  content,
  headerBar,
  navbarWrapper,
  nav,
  createIncidentButton,
} from "./styles/navStyles";

/**
 * IncidentsList View
 * triggers when / is accessed
 * @returns a custom made fixed navbar with menu items and infinite scrolling
 */
export const IncidentsListViewHeader: React.FC = () => {
  const [activePage, setPage] = useState<PageType>(PageType.All);

  return (
    <Block {...incidentsListView}>
      <Block {...container}>
        <Block {...headerBar}>
          <h1>Incidents</h1>
        </Block>
        <Block {...navbarWrapper}>
          <Block {...nav}>
            <NavBarMenuItem
              pageType={PageType.All}
              currentPage={activePage}
              onClick={() => setPage(PageType.All)}
            />
            <NavBarMenuItem
              pageType={PageType.Active}
              currentPage={activePage}
              onClick={() => setPage(PageType.Active)}
            />
            <NavBarMenuItem
              pageType={PageType.Maintenance}
              currentPage={activePage}
              onClick={() => setPage(PageType.Maintenance)}
            />
            <NavBarMenuItem
              pageType={PageType.Scheduled}
              currentPage={activePage}
              onClick={() => setPage(PageType.Scheduled)}
            />
          </Block>
          <Link href="/incident/new">
            <Block {...createIncidentButton}>Create incident</Block>
          </Link>
        </Block>
      </Block>
      <Block {...content}>
        <IncidentsList pageType={activePage} />
      </Block>
    </Block>
  );
};
